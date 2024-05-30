const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();

router.post("/",(req, res) => {

    const {username, password} = req.body;

    if (!!!username || !!!password){
            return res.status(400).json(
                jsonResponse(400, {
                error: "los campos son requeridos",
            })
        );
    }

    // autenticar usuario

    const accesToken = "access_token"
    const refreshToken = "refresh_token"
    const user = {
        id: "1",
        username: "dani",
    };


    res
    .status(200)
    .json(jsonResponse(200,{user, refreshToken, accesToken}))

});

module.exports = router;