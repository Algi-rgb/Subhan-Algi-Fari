const express = require("express");
const path = require("path");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/db");

const app = express();
const port = 3001;

/* ================= MIDDLEWARE ================= */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ================= SESSION ================= */

app.use(session({
    secret: "centralprintsecret",
    resave: false,
    saveUninitialized: false
}));

/* ================= VIEW ENGINE ================= */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", false);

/* ================= STATIC FILE ================= */

app.use(express.static(path.join(__dirname, "public")));

/* ================= AUTH MIDDLEWARE ================= */

const auth = require("./middleware/auth");

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");
const stokRoutes = require("./routes/stokRoutes");
const pesananRoutes = require("./routes/pesananRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

/* ================= LOGIN ================= */

app.use("/", authRoutes);

/* ================= DASHBOARD ================= */

app.get("/dashboard", auth, (req, res) => {

    const query = `
        SELECT 
            (SELECT COUNT(*) FROM pelanggan) AS pelanggan,
            (SELECT COUNT(*) FROM stok_barang) AS stok,
            (SELECT COUNT(*) FROM pesanan) AS pesanan,
            (SELECT COUNT(*) FROM invoice) AS invoice
    `;

    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Error dashboard");
        }

        res.render("dashboard", {
            title: "Dashboard",
            stats: result[0]
        });

    });

});

/* ================= CRUD ROUTES ================= */

app.use("/pelanggan", auth, pelangganRoutes);

app.use("/stok", auth, stokRoutes);

app.use("/pesanan", auth, pesananRoutes);

app.use("/invoice", auth, invoiceRoutes);

/* ================= LOGOUT ================= */

app.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.log(err);
            return res.send("Gagal logout");
        }

        res.redirect("/");

    });

});

/* ================= 404 ================= */

app.use((req, res) => {

    res.status(404).send("Halaman tidak ditemukan");

});

/* ================= SERVER ================= */

app.listen(port, () => {

    console.log(`Server running di http://localhost:${port}`);

});