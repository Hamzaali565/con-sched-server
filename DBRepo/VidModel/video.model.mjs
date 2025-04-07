import { Schema, model } from "mongoose";

const video = new Schema({
  videoTitle: { type: String, required: true },
  videoUrl: { type: String, required: true },
  specific: { type: Boolean, default: false },
  playAt: { type: String },
  status: { type: Boolean, default: false },
});

const videoModel = model("video", video);

export { videoModel };
