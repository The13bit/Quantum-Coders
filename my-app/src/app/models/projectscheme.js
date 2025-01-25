import mongoose from "mongoose";
import User from "./User.js"; // Reference to the User model

const ContributionSchema = new mongoose.Schema({
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  contributedAt: {
    type: Date,
    default: Date.now,
  },
});

const UpdateSchema = new mongoose.Schema({
  description: String,
  mediaUrls: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    faq:[
      {
        question: String,
        answer: String,
      },
    ],
    comments:[
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    description: String,
    fundingGoal: {
      type: Number,
      required: true,
    },
    deadline: Date,
    category: String,
    location: String,
    mediaUrls: [String],
    contributions: [ContributionSchema],
    progressUpdates: [UpdateSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
