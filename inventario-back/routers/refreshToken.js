const router = require("express").Router();
const express = require("express");
router.get("/",(req, res) => {
    res.send("refresh token");
});

module.exports = router;