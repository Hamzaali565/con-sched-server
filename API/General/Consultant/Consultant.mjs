import mongoose from "mongoose";
import express, { response } from "express";
import {
  ConsultantsModel,
  SpecialityModel,
} from "../../../DBRepo/General/ConsultantModel/ConsultantModel.mjs";
import moment from "moment";
import { getCreatedOn } from "../../../src/constants.mjs";
import {
  uploadImageMiddleware,
  uploadVideoMiddleware,
} from "../../../src/middlewares/multer.middleware.mjs";
import { videoModel } from "../../../DBRepo/VidModel/video.model.mjs";

const router = express.Router();

router.post("/adddoctor", async (req, res) => {
  try {
    const {
      name,
      speciality,
      specialityId,
      pmdc,
      address,
      email,
      cnic,
      phone,
      days,
      days1,
      days2,
      timing,
      timing1,
      timing2,
      status,
      qualification,
      roomNo,
      onLeave,
      remarks,
      welfareFee,
      appointmentFee,
      consultantShare,
      _id,
      leaveDate,
      specificRoom,
      specificType,
      specificCharges,
      specificDay,
    } = req.body;
    console.log(req.body);

    if (![name, speciality, specialityId, cnic, days, timing].every(Boolean))
      throw new Error("fields like Code, Name, Speciality, Cnic are Mendotary");
    if (_id !== "") {
      const findCons = await ConsultantsModel.findById(_id);
      const updateConsultant = await ConsultantsModel.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            name,
            speciality,
            pmdc,
            address,
            email,
            cnic,
            specialityId,
            phone,
            status,
            days,
            days1,
            days2,
            timing,
            timing1,
            timing2,
            qualification,
            roomNo,
            onLeave,
            remarks,
            consultantShare,
            appointmentFee,
            welfareFee,
            updatedOn: getCreatedOn(),
            leaveDate:
              leaveDate === "Invalid date" || leaveDate === ""
                ? "invalid date"
                : moment(leaveDate).format("DD/MM/YYYY"),
          },
          specificType,
          specificCharges,
          specificRoom,
          specificDay,
        },
        { new: true }
      );
      console.log("update", updateConsultant);

      res.status(200).send({ data1: updateConsultant, message: "update" });
      return;
    }
    const create = await ConsultantsModel.create({
      name,
      speciality,
      specialityId,
      pmdc,
      address,
      email,
      cnic,
      phone,
      status,
      days,
      days1,
      days2,
      timing,
      timing1,
      timing2,
      qualification,
      roomNo,
      onLeave,
      remarks,
      appointmentFee,
      welfareFee,
      consultantShare,
      createdOn: getCreatedOn(),
      leaveDate:
        leaveDate !== ""
          ? moment(leaveDate).format("DD/MM/YYYY")
          : "invalid date",
      specificType,
      specificCharges,
      specificRoom,
      specificDay,
    });
    console.log("create", create);

    res.status(200).send({ data: create, message: "created" });
  } catch (error) {
    console.log("error");

    res.status(400).send({ message: `${error.message}` });
  }
});

router.get("/getconsultant", async (req, res) => {
  try {
    const { All } = req.query;
    let response;
    if (!All) {
      response = await ConsultantsModel.find({ status: true });
      res.status(200).send({ data: response });
      return;
    }
    response = await ConsultantsModel.find({});
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

router.get("/vectorconsultant", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw new Error("Please Enter Name");
    let response = await ConsultantsModel.find({
      name: { $regex: new RegExp(`${name}`, "i") },
    });
    if (response.length <= 0)
      throw new Error("No Consultant Found with this Name.");
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

router.post("/specialty", async (req, res) => {
  try {
    const { speciality, _id } = req.body;
    if (!speciality) throw new Error("SPECIALITY IS REQUIRED !!!");
    if (!_id) {
      const response = await SpecialityModel.create({
        speciality,
        createdOn: getCreatedOn(),
      });
      res.status(200).send({ data: response });
      return;
    }
    const modifyData = await SpecialityModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          speciality,
          updatedOn: getCreatedOn(),
        },
      },
      {
        new: true,
      }
    );

    const updateSpecialityInConsDoc = await ConsultantsModel.updateMany(
      { specialityId: _id },
      {
        $set: {
          speciality,
        },
      }
    );
    res
      .status(200)
      .send({ data: response, modifyData, updateSpecialityInConsDoc });
  } catch (error) {
    res.status(400).send({ message: error?.message });
  }
});

router.get("/speciality", async (req, res) => {
  try {
    const response = await SpecialityModel.find({});
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const { _id, imageUrl } = req.body;
    if (![_id || imageUrl].every(Boolean))
      throw new Error("_id / ImageURL is missing");
    const response = await ConsultantsModel.findOneAndUpdate(
      { _id },
      { $set: { cProfile: imageUrl } },
      { new: true }
    );
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error?.message });
  }
});

// router.put("/speciality-profile", async (req, res) => {
//   try {
//     const { _id, speciality, imageUrl } = req.body;
//     if (![_id, speciality, imageUrl].every(Boolean))
//       throw new Error("_id / name / ImageURL is missing !!!");
//     const response = await ConsultantsModel.updateMany(
//       { specialityId: _id },
//       {
//         $set: {
//           specialityImage: imageUrl,
//         },
//       }
//     );
//     res.status(200).json({ data: `Image updated successfully ${response}!!!` });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.post("/video", async (req, res) => {
  try {
    const { videoTitle, videoUrl, specific, playAt, status } = req.body;
    console.log(req.body);

    if (![videoTitle, videoUrl].every(Boolean))
      throw new error("All parameters are required !!!");
    const response = await videoModel.create({
      videoTitle,
      videoUrl,
      specific,
      playAt,
      status,
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/video", async (req, res) => {
  try {
    const { videoTitle, specific, playAt, _id, status } = req.body;

    // if (![videoTitle, specific, playAt, _id, status].every(Boolean))
    //   throw new error("All parameters are required !!!");
    const response = await videoModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          videoTitle,
          specific,
          playAt,
          status,
        },
      },
      { new: true }
    );
    console.log(response);

    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
});

router.get("/video", async (req, res) => {
  try {
    const response = await videoModel.find({});
    if (response.length === 0) throw new Error("No data found ....");
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
