/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const DeleteEmployeeModal = ({
  isOpen,
  onClose,
  onDeleteEmployee,
  employeeData,
}) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDeleteEmployee(employeeData.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 shadow rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Delete Employee
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete {employeeData.name}?
        </p>
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
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
