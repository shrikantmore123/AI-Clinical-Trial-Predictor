const Trial = require("../models/trial");

module.exports.renderForm = (req, res) => {
    res.render("templates/form");
};

module.exports.createTrial = async (req, res, next) => {
    try {
        const { disease, drugName, phase, duration, summary } = req.body;
        const trial = new Trial({
            disease,
            drugName,
            phase,
            duration,
            summary,
            author: req.user._id, // attach logged-in user
        });
        await trial.save();
        req.flash("success", "Trial submitted successfully!");
        res.redirect("/dashboard");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/form");
    }
};