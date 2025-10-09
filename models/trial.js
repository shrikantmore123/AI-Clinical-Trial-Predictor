const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trialSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    disease: {
      type: String,
      required: true,
      trim: true,
    },
    drugName: {
      type: String,
      required: true,
      trim: true,
    },
    phase: {
      type: String,
      required: true,
      enum: ["I", "II", "III"],
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trial", trialSchema);