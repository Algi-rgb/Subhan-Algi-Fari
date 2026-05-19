const db = require('../config/db');

/* ================= INDEX ================= */
exports.index = (req, res) => {

    const q = `
        SELECT 
            invoice.*, 
            pelanggan.nama
        FROM invoice
        JOIN pesanan ON invoice.id_pesanan = pesanan.id
        JOIN pelanggan ON pesanan.id_pelanggan = pelanggan.id
    `;

    db.query(q, (err, result) => {
        if (err) {
            console.log("ERROR INDEX:", err);
            return res.send(err);
        }

        res.render("invoice/index", {
            title: "Invoice",
            invoice: result
        });
    });
};

/* ================= CREATE ================= */
exports.create = (req, res) => {

    const q = `
        SELECT pesanan.*, pelanggan.nama 
        FROM pesanan
        JOIN pelanggan ON pesanan.id_pelanggan = pelanggan.id
    `;

    db.query(q, (err, pesanan) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.render("invoice/create", {
            title: "Tambah Invoice",
            pesanan,
            error: null
        });
    });
};

/* ================= STORE ================= */
exports.store = (req, res) => {
    const { id_pesanan, total, metode_pembayaran, status_pembayaran, tanggal } = req.body;

    if (!id_pesanan || !total) {
        return res.send("Data tidak lengkap");
    }

    db.query(
        `INSERT INTO invoice 
        (id_pesanan, total, metode_pembayaran, status_pembayaran, tanggal) 
        VALUES (?, ?, ?, ?, ?)`,
        [id_pesanan, total, metode_pembayaran, status_pembayaran, tanggal],
        (err) => {
            if (err) {
                console.log("ERROR STORE:", err);
                return res.send(err);
            }

            res.redirect("/invoice");
        }
    );
};

/* ================= DELETE ================= */
exports.delete = (req, res) => {
    db.query("DELETE FROM invoice WHERE id=?", [req.params.id], (err) => {
        if (err) {
            console.log("ERROR DELETE:", err);
            return res.send(err);
        }

        res.redirect("/invoice");
    });
};