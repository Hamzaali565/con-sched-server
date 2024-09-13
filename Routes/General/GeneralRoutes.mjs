import express from "express";
let router = express.Router();

import ConsultantAPI from "../../API/General/Consultant/Consultant.mjs";

router.use(ConsultantAPI);
export default router;
