const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trialSchema = new Schema({
    disease: {
        type: String,
        required: true
    },
    drugName: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    aiResponse: String
}, { timestamps: true });

module.exports = mongoose.model("Trial", trialSchema);