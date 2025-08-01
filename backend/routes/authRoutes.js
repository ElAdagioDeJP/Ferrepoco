
const express = require('express');
const router = express.Router();
const { readData } = require('../utils/dataHandler');
const jwt = require('jsonwebtoken');

// Use a strong secret in production! For demo, hardcoded here:
const JWT_SECRET = process.env.JWT_SECRET || 'ferrepoco_super_secret_key';


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readData('users.json');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '8h' }
        );
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                token // Include token in user object
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;