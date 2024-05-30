const express = require('express');
const User = require('../schema/user');
const bcrypt = require('bcrypt');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;