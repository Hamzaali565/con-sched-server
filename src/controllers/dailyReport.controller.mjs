import { ApiResponse } from "../utils/ApiResponse.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import { dailyReportModel } from "../../DBRepo/dailyReport/DailyReportModel.mjs";

const daily_report_cont = asyncHandler(async (req, res) => {
  try {
    const { data, title } = req.body;
    if (!data || !title) throw new ApiError(404, "Missing required fields");
    const check_data = await dailyReportModel.findOne({
      title,
      is_deleted: false,
    });
    if (check_data) {
      res
        .status(400)

        .json({
          message: `Daily report of ${title} already saved. If you want to save new then delete previous one`,
        });
      return;
    }
    //   throw new ApiError(
    //     400,
    //     `Daily report of ${title} already saved. If you want to save new then delete previous one`
    //   );
    const daily_report = await dailyReportModel.create({ data, title });
    res.status(201).json(new ApiResponse(200, { data: daily_report }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Propagate the structured error
    }
    console.log(error);

    throw new ApiError(500, "Internal server error");
  }
});

const delete_dail_report = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new ApiError(404, "ID not found");
    const daily_report_delete = await dailyReportModel.findOneAndUpdate(
      { _id },
      { $set: { is_deleted: true } },
      { new: true }
    );
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Record deleted successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

const get_all_reports = asyncHandler(async (req, res) => {
  try {
    const response = await dailyReportModel.find(
      { is_deleted: false },
      "title"
    );
    if (response.length === 0) throw new ApiError(404, "No data found");
    res.status(200).json(new ApiResponse(200, { data: response }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

const get_report_by_title = asyncHandler(async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) throw new ApiError(404, "Title is required !!!");
    const response = await dailyReportModel.findOne({
      title,
      is_deleted: false,
    });
    if (!response) throw new ApiError(404, "No data found");
    res.status(200).json(new ApiResponse(200, { data: response }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

export {
  daily_report_cont,
  delete_dail_report,
  get_all_reports,
  get_report_by_title,
};
