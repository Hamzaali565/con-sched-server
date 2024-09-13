import express from "express";
const router = express.Router();

import GeneralData from "../General/GeneralRoutes.mjs";

router.use(GeneralData);

export default router;
