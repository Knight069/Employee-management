const express = require("express");
const zod = require("zod");
const { Employee, Attendance, Leave } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware, adminMiddleware } = require("../middleware");


// Mark Attendance (login and logout)
router.post('/mark', authMiddleware, async (req, res) => {
    const { login, logout } = req.body;
    
    if (!login || !logout) {
        return res.status(400).json({ message: "Login and logout times are required" });
    }

    const hoursWorked = (new Date(logout) - new Date(login)) / (1000 * 60 * 60);

    let status;
    if (hoursWorked < 5) {
        status = 'Absent';
    } else if (hoursWorked < 9) {
        status = 'Half-day';
    } else if (hoursWorked < 10) {
        status = 'Present';
    } else {
        status = 'Over-time';
    }

    const attendance = new Attendance({
        employee: req.userId,
        login,
        logout,
        status,
    });

    await attendance.save();

    res.json({ message: "Attendance marked successfully", attendance });
});


// View personal attendance records
router.get('/personal', authMiddleware, async (req, res) => {
    const attendanceRecords = await Attendance.find({ employee: req.userId });

    res.json({ attendance: attendanceRecords });
});


module.exports = router;