const express = require("express");
const authMiddleware = require("../auth/auth")
const {registerSchool, getAllSchools, loginSchool, updateSchool, getSchoolOwnData}= require("../controllers/schoolcontroller");

const router = express.Router();


router.post("/register", registerSchool);
router.get("/all",getAllSchools);
router.post("/login",loginSchool);
router.patch("/update", authMiddleware(['SCHOOL']), updateSchool); // Authenticated for update
router.get("/fetch-single",  authMiddleware(['SCHOOL']),getSchoolOwnData)

module.exports= router;
