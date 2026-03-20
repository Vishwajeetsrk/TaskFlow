const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Helper for stats
const getStats = async (userId) => {
    const total = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({ userId, status: 'Completed' });
    const pending = await Task.countDocuments({ userId, status: 'Pending' });
    return { total, completed, pending };
};

// Dashboard
router.get('/dashboard', auth, async (req, res) => {
    try {
        const stats = await getStats(req.session.userId);
        const user = await User.findById(req.session.userId);
        const tasks = await Task.find({ userId: req.session.userId }).sort({ createdAt: -1 }).limit(5);
        
        const aiSuggestions = ["Review React Docs", "Update LinkedIn Profile", "Refactor CSS", "Team Meeting Prep"];
        const aiTask = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];

        res.render('dashboard', { 
            user: { name: req.session.userName, points: user.points }, 
            stats, 
            tasks, 
            aiTask 
        });
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
});

// All Tasks Page
router.get('/tasks', auth, async (req, res) => {
    try {
        const { search, category, status } = req.query;
        let query = { userId: req.session.userId };

        if (search) query.title = { $regex: search, $options: 'i' };
        if (category && category !== 'All') query.category = category;
        if (status && status !== 'All') query.status = status;

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.render('tasks', { user: { name: req.session.userName }, tasks, query: req.query });
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

// Add Task
router.post('/task/add', auth, async (req, res) => {
    try {
        await Task.create({ ...req.body, userId: req.session.userId });
        res.redirect('back');
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
});

// EDIT: Render Edit Form
router.get('/task/edit/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const user = await User.findById(req.session.userId);
        res.render('editTask', { 
            task, 
            user: { name: req.session.userName, points: user.points } 
        });
    } catch (err) {
        console.error(err);
        res.redirect('/tasks');
    }
});

// EDIT: Update Logic
router.put('/task/edit/:id', auth, async (req, res) => {
    try {
        const { title, description, priority, category, dueDate } = req.body;
        await Task.findByIdAndUpdate(req.params.id, { title, description, priority, category, dueDate });
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.redirect('/tasks');
    }
});

// Update Status (Toggle Complete)
router.put('/task/update/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.redirect('back');

        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        
        if (newStatus === 'Completed') {
            const user = await User.findById(req.session.userId);
            user.points += 10;
            await user.save();
        }

        task.status = newStatus;
        await task.save();
        res.redirect('back');
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
});

// Delete Task
router.delete('/task/delete/:id', auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('back');
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
});

module.exports = router;