module.exports = (req, res, next) => {

    console.log("SESSION:", req.session);

    if (req.session && req.session.user) {
        return next();
    }

    return res.redirect("/");
};