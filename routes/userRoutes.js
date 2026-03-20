const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/authMiddleware');

// --- Profile Page ---
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const stats = await Task.countDocuments({ userId: req.session.userId });
        
        res.render('profile', { 
            user: { 
                name: user.name, 
                email: user.email, 
                bio: user.bio || 'No bio added yet.', // Pass bio or default text
                id: user._id,
                points: user.points,
                joinDate: user.createdAt,
                totalTasks: stats
            }
        });
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
});

// --- Settings Page ---
router.get('/settings', auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('settings', { 
            user: { name: user.name, email: user.email, bio: user.bio || '' },
            success: null, 
            error: null 
        });
    } catch (err) { res.redirect('/login'); }
});

// --- Update Profile (Bio/Name) ---
router.post('/settings/update', auth, async (req, res) => {
    try {
        const { name, bio } = req.body;
        
        // Update database with new name and bio
        await User.findByIdAndUpdate(req.session.userId, { 
            name: name, 
            bio: bio 
        });
        
        // Update session name immediately
        req.session.userName = name;
        
        // Fetch updated user to display on settings page
        const user = await User.findById(req.session.userId);
        
        res.render('settings', { 
            user: { name: user.name, email: user.email, bio: user.bio || '' }, 
            success: 'Profile Updated Successfully!',
            error: null
        });
    } catch (err) {
        console.error(err);
        res.redirect('/settings');
    }
});

// --- Change Password ---
router.post('/settings/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.session.userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.render('settings', { 
                user: { name: user.name, email: user.email, bio: user.bio || '' }, 
                success: null, 
                error: 'Incorrect current password.' 
            });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.render('settings', { 
            user: { name: user.name, email: user.email, bio: user.bio || '' }, 
            success: 'Password changed successfully!', 
            error: null 
        });
    } catch (err) { res.redirect('/settings'); }
});

// --- Delete Account ---
router.post('/settings/delete', auth, async (req, res) => {
    try {
        await Task.deleteMany({ userId: req.session.userId });
        await User.findByIdAndDelete(req.session.userId);
        req.session.destroy(() => res.redirect('/login'));
    } catch (err) { res.redirect('/settings'); }
});

// --- Static Pages ---
router.get('/about', (req, res) => {
    res.render('about', { user: req.session.userId ? { name: req.session.userName } : null });
});

router.get('/contact', (req, res) => {
    res.render('contact', { user: req.session.userId ? { name: req.session.userName } : null });
});

module.exports = router;