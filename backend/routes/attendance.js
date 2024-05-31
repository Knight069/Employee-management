const express = require("express");
const zod = require("zod");
const { Employee, Attendance, Leave } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware, adminMiddleware } = require("../middleware");

const router = express.Router();

// View personal attendance records
router.get('/personal', authMiddleware, async (req, res) => {
    const attendanceRecords = await Attendance.find({ employee: req.userId });

    res.json({ attendance: attendanceRecords });
});


module.exports = router;