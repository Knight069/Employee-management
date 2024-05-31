/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// LeaveApplication.js
import React, { useState } from "react";
import axios from "axios";
import { InputBox } from "../components/InputBox";

export const ApplyLeave = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleApplyLeave = (e) => {
    e.preventDefault();
    // Logic to handle leave application submission
    console.log(`Leave applied from ${startDate} to ${endDate}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white p-8 shadow rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Apply for Leave
        </h2>
        <form onSubmit={handleApplyLeave}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="start-date">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              className="w-full p-2 border border-gray-300 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="end-date">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              className="w-full p-2 border border-gray-300 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              required
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700 mb-2" htmlFor="end-date">
              Reason
            </label> */}
            <InputBox
              type="text"
              placeholder="Leave Reason"
              label={"Reason"}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/leave/apply",
                {
                  startDate,
                  endDate,
                  reason,
                }
              );
            }}
          >
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  );
};

