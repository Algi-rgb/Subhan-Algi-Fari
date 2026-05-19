const db = require("../config/db");

/* ================= INDEX ================= */
exports.index = (req, res) => {

    const q = `
        SELECT 
            pesanan.*, 
            pelanggan.nama
        FROM pesanan
        JOIN pelanggan 
        ON pesanan.id_pelanggan = pelanggan.id
    `;

    db.query(q, (err, result) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.render("pesanan/index", {
            title: "Pesanan",
            pesanan: result
        });
    });
};


/* ================= CREATE ================= */
exports.create = (req, res) => {

    db.query("SELECT * FROM pelanggan", (err, pelanggan) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.render("pesanan/create", {
            title: "Tambah Pesanan",
            pelanggan
        });
    });
};


/* ================= STORE ================= */
exports.store = (req, res) => {

    const {
        pelanggan_id,
        tanggal_pesanan,
        total_harga,
        status_pesanan
    } = req.body;

    const q = `
        INSERT INTO pesanan
        (
            id_pelanggan,
            tanggal_pesanan,
            total_harga,
            status_pesanan
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        q,
        [
            pelanggan_id,
            tanggal_pesanan,
            total_harga,
            status_pesanan
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.redirect("/pesanan");
        }
    );
};


/* ================= EDIT ================= */
exports.edit = (req, res) => {

    db.query("SELECT * FROM pelanggan", (err, pelanggan) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        db.query(
            "SELECT * FROM pesanan WHERE id=?",
            [req.params.id],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.render("pesanan/edit", {
                    title: "Edit Pesanan",
                    data: result[0],
                    pelanggan
                });
            }
        );
    });
};


/* ================= UPDATE ================= */
exports.update = (req, res) => {

    const {
        pelanggan_id,
        tanggal_pesanan,
        total_harga,
        status_pesanan
    } = req.body;

    const q = `
        UPDATE pesanan
        SET
            id_pelanggan=?,
            tanggal_pesanan=?,
            total_harga=?,
            status_pesanan=?
        WHERE id=?
    `;

    db.query(
        q,
        [
            pelanggan_id,
            tanggal_pesanan,
            total_harga,
            status_pesanan,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.redirect("/pesanan");
        }
    );
};


/* ================= DELETE ================= */
exports.delete = (req, res) => {

    db.query(
        "DELETE FROM pesanan WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.redirect("/pesanan");
        }
    );
};