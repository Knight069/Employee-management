/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

export const EditEmployeeModal = ({
  isOpen,
  onClose,
  onEditEmployee,
  employeeData,
}) => {
  const [formData, setFormData] = useState(employeeData);

  useEffect(() => {
    setFormData(employeeData);
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditEmployee(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 shadow rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          {[
            "name",
            "email",
            "department",
            "designation",
            "employeeCode",
            "officeTimings",
          ].map((field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-gray-700 mb-2 capitalize"
                htmlFor={field}
              >
                {field}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                className="w-full p-2 border border-gray-300 rounded"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
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
            >
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
