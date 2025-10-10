const express = require('express');
const router = express.Router();
const Trial = require('../models/Trial'); 
const { isLoggedIn } = require('../middleware/auth');

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const trials = await Trial.find({ author: req.user._id }).sort({ createdAt: -1 }).limit(5); 

        res.render('dashboard', { trials });
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.render('dashboard', { trials: [] });
    }
});

module.exports = router;
