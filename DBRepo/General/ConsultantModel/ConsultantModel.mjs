import mongoose, { Schema } from "mongoose";
import { getCreatedOn } from "../../../src/constants.mjs";
import { stringify } from "uuid";

const consultant = new Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  specialityId: { type: mongoose.ObjectId, required: true },
  pmdc: { type: String },
  address: { type: String },
  email: { type: String },
  cnic: { type: String, required: true },
  phone: { type: String },
  status: { type: Boolean, default: false },
  days: { type: String, required: true },
  days1: { type: String },
  days2: { type: String },
  timing: { type: String },
  timing1: { type: String },
  timing2: { type: String },
  createdOn: { type: String },
  updatedUser: { type: String },
  updatedOn: { type: String },
  qualification: { type: String },
  roomNo: { type: String },
  onLeave: { type: Boolean, default: false },
  remarks: { type: String },
  appointmentFee: { type: Number },
  welfareFee: { type: String },
  consultantShare: { type: String },
  leaveDate: { type: String },
  cProfile: { type: String },
  specialityImage: { type: String },
  specificType: { type: Boolean, default: false },
  specificCharges: { type: Number, default: 0 },
  specificRoom: { type: String },
  specificDay: { type: String },
});

export const ConsultantsModel = mongoose.model("Consultant New", consultant);

const speciality = new Schema({
  speciality: { type: String, required: true },
  createdOn: { type: String, required: true },
  updatedUser: { type: String },
  updatedOn: { type: String },
});

export const SpecialityModel = mongoose.model("Speciality", speciality);
