const express = require("express");
const router = express.Router();

// Middleware cek login
function isLoggedIn(req, res, next) {
    if (req.session.loggedIn) {
        return next();
    }
    res.redirect("/login");
}

router.get("/", isLoggedIn, (req, res) => {
    res.render("dashboard", {
        admin: req.session.admin
    });
});

module.exports = router;
