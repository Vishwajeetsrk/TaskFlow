const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

// Signup Logic
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.render('signup', { error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect('/dashboard');
    } catch (err) {
        res.render('signup', { error: 'Something went wrong' });
    }
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login Logic
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.render('login', { error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render('login', { error: 'Invalid credentials' });

        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect('/dashboard');
    } catch (err) {
        res.render('login', { error: 'Something went wrong' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Root redirect
router.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.redirect('/login');
});

module.exports = router;