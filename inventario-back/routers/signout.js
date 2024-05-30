const router = require("express").Router();

router.get("/",(req, res) => {
    res.send("signoput");
});

module.exports = router;