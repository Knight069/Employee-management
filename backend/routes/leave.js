const express = require("express");
const zod = require("zod");
const { Employee, Attendance, Leave } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware, adminMiddleware } = require("../middleware");


// Apply for leave (up to one year in advance)
const leaveApplicationSchema = zod.object({
    startDate: zod.string(),
    endDate: zod.string(),
    reason: zod.string().optional()
});

router.post('/apply', authMiddleware, async (req, res) => {
    const result = leaveApplicationSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const leave = new Leave({
        employee: req.userId,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        reason: req.body.reason,
        status: 'Pending'
    });

    await leave.save();

    res.json({ message: "Leave applied successfully", leave });
});

module.exports = router;
