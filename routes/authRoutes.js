const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

/* LOGIN PAGE */
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

/* LOGIN PROCESS */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {

        if (err) return res.send("Database error");

        if (result.length === 0) {
            return res.render("login", { error: "User tidak ditemukan" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("login", { error: "Password salah" });
        }

        // 🔥 SIMPAN SESSION
        req.session.user = {
            id: user.id,
            username: user.username
        };

        console.log("LOGIN BERHASIL:", req.session.user);

        // 🔥 PASTIKAN SESSION TERSIMPAN
        req.session.save((err) => {
            if (err) return res.send("Session error");

            res.redirect("/dashboard");
        });

    });
});

/* LOGOUT */
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;