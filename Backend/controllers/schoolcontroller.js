require("dotenv").config();
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const School = require("../models/schoolmodel");

module.exports = {
    // 🟢 Register School
    registerSchool: async (req, res) => {
        try {
            const form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.multiples = false;

            form.parse(req, async (err, fields, files) => {
                if (err) return res.status(400).json({ success: false, message: "Error parsing form" });

                // Validate email
                if (!fields.email || !fields.email[0]) {
                    return res.status(400).json({ success: false, message: "Email is required" });
                }

                const email = fields.email[0].trim().toLowerCase(); // Normalize email
                const existingSchool = await School.findOne({ email });
                if (existingSchool) {
                    return res.status(409).json({ success: false, message: "Email is already registered!" });
                }

                if (!files.school_image || files.school_image.length === 0) {
                    return res.status(400).json({ success: false, message: "School image is required" });
                }

                const photo = files.school_image[0];
                const filepath = photo.filepath;
                const originalFilename = photo.originalFilename.replace(/\s/g, "_"); // Replace spaces
                const newpath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFilename);

                let photodata = fs.readFileSync(filepath);
                fs.writeFileSync(newpath, photodata);

                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(fields.password[0], salt);

                const newSchool = new School({
                    school_name: fields.school_name[0],
                    email,
                    owner_name: fields.owner_name[0],
                    school_image: originalFilename,
                    password: hashPassword,
                });

                await newSchool.save();
                res.status(200).json({ success: true, message: "School registered successfully!" });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "School registration failed." });
        }
    },

    // 🔵 Login School
    loginSchool: async (req, res) => {
        try {
            const school = await School.findOne({ email: req.body.email }); // ✅ Use findOne()

            if (!school) {
                return res.status(401).json({ success: false, message: "Email is not registered!" });
            }

            const isAuth = bcrypt.compareSync(req.body.password, school.password);
            if (!isAuth) {
                return res.status(401).json({ success: false, message: "Incorrect password!" });
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({ success: false, message: "JWT secret not configured." });
            }

            const token = jwt.sign(
                {
                    id: school._id,
                    school_ID: school._id,
                    owner_name: school.owner_name,
                    school_name: school.school_name,
                    image_url: school.school_image,
                    role: "SCHOOL"
                },
                jwtSecret,
                { expiresIn: "7d" }
            );

            res.status(200).json({
                success: true,
                message: "Login Success",
                user: {
                    id: school._id,
                    school_ID: school._id,
                    owner_name: school.owner_name,
                    school_name: school.school_name,
                    image_url: school.school_image,
                    role: "SCHOOL",
                    token: token
                }
            });
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // 🟢 Get All Schools
    getAllSchools: async (req, res) => {
        try {
            const schools = await School.find().select(["-password", "-_id", "-email", "-owner_name", "-createdAt"]);
            res.status(200).json({ success: true, message: "Success in fetching all schools", schools });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error " });
        }
    },

    // 🔵 Get Own School Data
    getSchoolOwnData: async (req, res) => {
        try {
            const id = req.user.id;
            const school = await School.findOne({ _id: id });
            if (school) {
                res.status(200).json({ success: true, school });
            } else {
                res.status(404).json({ success: false, message: "School not found!" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error [Own School Data]" });
        }
    },

    // 🔵 Update School
    updateSchool: async (req, res) => {
        try {
            const id = req.user.id;
            const form = new formidable.IncomingForm();
            form.keepExtensions = true;

            form.parse(req, async (err, fields, files) => {
                if (err) return res.status(400).json({ success: false, message: "Form parsing error" });

                const school = await School.findOne({ _id: id });
                if (!school) {
                    return res.status(404).json({ success: false, message: "School not found" });
                }

                // ✅ Check for image upload
                if (files.school_image) {
                    const photo = files.school_image[0];
                    const filepath = photo.filepath;
                    const originalFilename = photo.originalFilename.replace(/\s/g, "_");

                    if (school.school_image) {
                        let oldImagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, school.school_image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlink(oldImagePath, (err) => {
                                if (err) console.log("Error deleting old image.", err);
                            });
                        }
                    }

                    const newpath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFilename);
                    let photodata = fs.readFileSync(filepath);
                    fs.writeFileSync(newpath, photodata);

                    school.school_image = originalFilename;
                }

                // ✅ Update fields dynamically
                Object.keys(fields).forEach((field) => {
                    school[field] = fields[field][0];
                });

                await school.save();
                res.status(200).json({ success: true, message: "School updated successfully.", school });
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "School Update Failed." });
        }
    }
};
