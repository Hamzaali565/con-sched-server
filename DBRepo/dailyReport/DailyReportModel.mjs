import { Schema, model } from "mongoose";

const report_schema = new Schema(
  {
    title: { type: String, required: true },
    data: { type: Object, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const dailyReportModel = model("daily_report", report_schema);

export { dailyReportModel };
