require("dotenv").config();
const Trial = require("../models/trial");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports.submitTrial = async (req, res) => {
    try {
        const { disease, drugName, phase, duration, summary } = req.body;

        // Generate AI response
        const aiResult = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful clinical trial assistant." },
                { role: "user", content: `Provide a summary analysis for a trial with disease: ${disease}, drug: ${drugName}, phase: ${phase}, duration: ${duration}, summary: ${summary}` }
            ],
            max_tokens: 300
        });

        const aiResponse = aiResult.choices[0].message.content;

        // Save trial to DB
        const trial = new Trial({
            disease,
            drugName,
            phase,
            duration,
            summary,
            author: req.user._id,
            aiResponse
        });

        await trial.save();
        req.flash("success", "Trial submitted successfully!");
        res.redirect("/dashboard");

    } catch (e) {
        console.error("Error submitting trial:", e);
        req.flash("error", e.message);
        res.redirect("/form");
    }
};