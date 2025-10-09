const dotenv = require("dotenv");
const OpenAI = require("openai");
const Trial = require("../models/trial");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.submitTrial = async (req, res) => {
  try {
    const { disease, drugName, phase, duration, summary } = req.body;
    const userId = req.user ? req.user._id : null; // Get logged-in user ID

    if (!disease || !drugName || !phase || !duration || !summary) {
      return res.status(400).send("All fields are required");
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content:
            "You are an AI expert specialized in analyzing clinical trials. Provide a short, structured analysis in simple terms.",
        },
        {
          role: "user",
          content: `Analyze the following clinical trial details and predict possible outcomes:

          Disease: ${disease}
          Drug Name: ${drugName}
          Phase: ${phase}
          Duration: ${duration}
          Summary: ${summary}

          Give output with: 
          1. Key Highlights 
          2. Potential Challenges 
          3. AI-based Prediction Summary.`,
        },
      ],
    });

    const analysis = aiResponse.choices[0].message.content;

    const newTrial = new Trial({
      user: userId,
      disease,
      drugName,
      phase,
      duration,
      summary,
      aiResponse: analysis,
    });

    await newTrial.save();

    req.flash("success_msg", "Trial submitted successfully!");
    res.redirect("/dashboard");

  } catch (error) {
    console.error("Error submitting trial:", error);
    req.flash("error_msg", "Failed to analyze or save trial. Please try again.");
    res.redirect("/form");
  }
};