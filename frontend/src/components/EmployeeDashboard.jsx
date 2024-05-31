/* eslint-disable no-unused-vars */
// EmployeeDashboard.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApplyLeave } from "../pages/ApplyLeave";

export const EmployeeDashboard = () => {
    const [startDate, setStartdate] = useState("");
    const [endDate, setEnddate] = useState("");
    const [reason, setReason] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleApplyLeaveClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Apply for Leave
          </h2>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={handleApplyLeaveClick}
          >
            Apply
          </button>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            View Attendance Records
          </h2>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">
            View Records
          </button>
        </div>
        <ApplyLeave
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};



