/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export const LeaveRequestModal = ({
  isOpen,
  onClose,
  leaveRequest,
  onApprove,
  onDisapprove,
}) => {
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    onApprove(leaveRequest._id, comment);
  };

  const handleDisapprove = () => {
    onDisapprove(leaveRequest._id, comment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 shadow rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave Request</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Employee Name</label>
          <p>{leaveRequest.employeeName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Leave Type</label>
          <p>{leaveRequest.leaveType}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Leave Duration</label>
          <p>
            {leaveRequest.startDate} to {leaveRequest.endDate}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Comment</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-700"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={handleDisapprove}
          >
            Disapprove
          </button>
        </div>
      </div>
    </div>
  );
};
