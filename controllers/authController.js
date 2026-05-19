const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
  loginPage: (req, res) => {
    res.render('login', { error: null });
  },

  loginProcess: (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM admin WHERE username = ?";
    db.query(query, [username], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.render('login', { error: "Username tidak ditemukan!" });
      }

      const admin = result[0];

      bcrypt.compare(password, admin.password, (err, match) => {
        if (!match) {
          return res.render('login', { error: "Password salah!" });
        }

        // berhasil login → simpan session
        req.session.loggedIn = true;
        req.session.admin = admin;

        res.redirect('/dashboard');
      });
    });
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};
