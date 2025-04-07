import { Router } from "express";
import {
  daily_report_cont,
  delete_dail_report,
  get_all_reports,
  get_report_by_title,
} from "../controllers/dailyReport.controller.mjs";

const router = Router();

router.route("/daily_report").post(daily_report_cont);
router.route("/daily_report").put(delete_dail_report);
router.route("/daily_report").get(get_all_reports);
router.route("/daily_report_title").get(get_report_by_title);

export default router;
