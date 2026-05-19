const db = require('../config/db');

/* INDEX */
exports.index = (req, res) => {
    db.query("SELECT * FROM pelanggan", (err, result) => {
        if (err) return res.send(err);

        res.render("pelanggan/index", {
            title: "Pelanggan",
            pelanggan: result
        });
    });
};

/* CREATE */
exports.create = (req, res) => {
    res.render("pelanggan/create", {
        title: "Tambah Pelanggan",
        error: null
    });
};

/* STORE */
exports.store = (req, res) => {
    const { nama, no_hp, alamat } = req.body;

    if (!nama || !no_hp) {
        return res.render("pelanggan/create", {
            title: "Tambah Pelanggan",
            error: "Nama dan No HP wajib diisi"
        });
    }

    db.query(
        "INSERT INTO pelanggan (nama, no_hp, alamat) VALUES (?, ?, ?)",
        [nama, no_hp, alamat],
        (err) => {
            if (err) return res.send(err);
            res.redirect("/pelanggan");
        }
    );
};

/* EDIT */
exports.edit = (req, res) => {
    db.query("SELECT * FROM pelanggan WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.send(err);

        res.render("pelanggan/edit", {
            title: "Edit Pelanggan",
            data: result[0],
            error: null
        });
    });
};

/* UPDATE */
exports.update = (req, res) => {
    const { nama, no_hp, alamat } = req.body;

    if (!nama || !no_hp) {
        return res.render("pelanggan/edit", {
            title: "Edit Pelanggan",
            error: "Nama dan No HP wajib diisi",
            data: { id: req.params.id, nama, no_hp, alamat }
        });
    }

    db.query(
        "UPDATE pelanggan SET nama=?, no_hp=?, alamat=? WHERE id=?",
        [nama, no_hp, alamat, req.params.id],
        (err) => {
            if (err) return res.send(err);
            res.redirect("/pelanggan");
        }
    );
};

/* DELETE */
exports.delete = (req, res) => {
    db.query("DELETE FROM pelanggan WHERE id=?", [req.params.id], (err) => {
        if (err) return res.send(err);
        res.redirect("/pelanggan");
    });
};