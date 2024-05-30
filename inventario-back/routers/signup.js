const bcrypt = require('bcrypt');
const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("../schema/user");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Los campos son requeridos",
            })
        );
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(200).json(jsonResponse(200, {
            message: "Usuario creado exitosamente",
            user: newUser
        }));
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(jsonResponse(400, {
                error: "El nombre de usuario ya existe"
            }));
        } else {
            res.status(500).json(jsonResponse(500, {
                error: "Error al crear el usuario"
            }));
        }
    }
});

module.exports = router;
