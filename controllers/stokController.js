const db = require('../config/db');

/* INDEX */
exports.index = (req, res) => {
    db.query("SELECT * FROM stok_barang", (err, result) => {
        if (err) return res.send(err);

        res.render("stok/index", {
            title: "Stok Barang",
            stok: result
        });
    });
};

/* CREATE */
exports.create = (req, res) => {
    res.render("stok/create", {
        title: "Tambah Stok",
        error: null
    });
};

/* STORE */
exports.store = (req, res) => {
    const { nama_barang, jumlah, satuan } = req.body;

    if (!nama_barang || !jumlah) {
        return res.render("stok/create", {
            title: "Tambah Stok",
            error: "Nama dan jumlah wajib diisi"
        });
    }

    db.query(
        "INSERT INTO stok_barang (nama_barang, jumlah, satuan) VALUES (?, ?, ?)",
        [nama_barang, jumlah, satuan],
        (err) => {
            if (err) return res.send(err);
            res.redirect("/stok");
        }
    );
};

/* EDIT */
exports.edit = (req, res) => {
    db.query("SELECT * FROM stok_barang WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.send(err);

        res.render("stok/edit", {
            title: "Edit Stok",
            data: result[0],
            error: null
        });
    });
};

/* UPDATE */
exports.update = (req, res) => {
    const { nama_barang, jumlah, satuan } = req.body;

    if (!nama_barang || !jumlah) {
        return res.render("stok/edit", {
            title: "Edit Stok",
            error: "Nama dan jumlah wajib diisi",
            data: { id: req.params.id, nama_barang, jumlah, satuan }
        });
    }

    db.query(
        "UPDATE stok_barang SET nama_barang=?, jumlah=?, satuan=? WHERE id=?",
        [nama_barang, jumlah, satuan, req.params.id],
        (err) => {
            if (err) return res.send(err);
            res.redirect("/stok");
        }
    );
};

/* DELETE */
exports.delete = (req, res) => {
    db.query("DELETE FROM stok_barang WHERE id=?", [req.params.id], (err) => {
        if (err) return res.send(err);
        res.redirect("/stok");
    });
};