/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { EditEmployeeModal } from "./EditEmployeeModal";
import { DeleteEmployeeModal } from "./DeleteEmployeeModal";
import { LeaveRequestModal } from "./LeaveRequestModal";
import { Appbar } from "./Appbar";

export const AdminDashboard = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] = useState(false);
  const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
  const [isViewAttendanceModalOpen, setIsViewAttendanceModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leave requests on component mount
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/leave-requests"
      );
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleAddEmployee = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditEmployeeModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleCloseEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(false);
  };

  const handleCloseDeleteEmployeeModal = () => {
    setIsDeleteEmployeeModalOpen(false);
  };

  const handleLeaveRequestClick = (leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsLeaveRequestModalOpen(true);
  };

  const handleCloseLeaveRequestModal = () => {
    setIsLeaveRequestModalOpen(false);
  };

  const handleViewAttendance = () => {
    setIsViewAttendanceModalOpen(true);
  };

  const handleCloseViewAttendanceModal = () => {
    setIsViewAttendanceModalOpen(false);
  };

  const handleAddEmployeeSubmit = async (employeeData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/employees",
        employeeData
      );
      setSearchResults([...searchResults, response.data]);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployeeSubmit = async (employeeData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/employees/${employeeData._id}`,
        employeeData
      );
      setSearchResults(
        searchResults.map((emp) =>
          emp._id === employeeData._id ? response.data : emp
        )
      );
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const handleDeleteEmployeeSubmit = async (employeeId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/employees/${employeeId}`
      );
      setSearchResults(searchResults.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/employees?search=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  const handleApproveLeaveRequest = async (leaveRequestId, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/leave-requests/${leaveRequestId}/approve`,
        { comment }
      );
      setLeaveRequests(
        leaveRequests.map((lr) =>
          lr._id === leaveRequestId ? response.data : lr
        )
      );
      setIsLeaveRequestModalOpen(false);
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleDisapproveLeaveRequest = async (leaveRequestId, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/leave-requests/${leaveRequestId}/disapprove`,
        { comment }
      );
      setLeaveRequests(
        leaveRequests.map((lr) =>
          lr._id === leaveRequestId ? response.data : lr
        )
      );
      setIsLeaveRequestModalOpen(false);
    } catch (error) {
      console.error("Error disapproving leave request:", error);
    }
  };

  
  return (
    <>
      <Appbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <form onSubmit={handleSearch} className="mt-4">
            <input
              type="text"
              placeholder="Search Employee"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 w-full"
            >
              Search
            </button>
          </form>
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Search Results:
              </h3>
              {searchResults.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-gray-100 p-2 mb-2 rounded flex justify-between items-center"
                >
                  <div>
                    <p>{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.email}</p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700 mr-2"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                      onClick={() => handleDeleteEmployee(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Manage Employees
            </h2>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Attendance Records
            </h2>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={handleViewAttendance}
            >
              View Records
            </button>
            {/* Add more admin-specific features and components here */}
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leave Requests
            </h2>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((leaveRequest) => (
                <div
                  key={leaveRequest._id}
                  className="bg-gray-100 p-2 mb-2 rounded flex justify-between items-center"
                >
                  <div>
                    <p>{leaveRequest.employeeName}</p>
                    <p className="text-sm text-gray-600">
                      {leaveRequest.leaveType}
                    </p>
                    <p className="text-sm text-gray-600">
                      {leaveRequest.startDate} to {leaveRequest.endDate}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700"
                      onClick={() => handleLeaveRequestClick(leaveRequest)}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No leave requests found.</p>
            )}
          </div>
          {/* Add more sections as needed */}
        </div>
        {/* Add Employee Modal */}
        <AddEmployeeModal
          isOpen={isAddEmployeeModalOpen}
          onClose={handleCloseAddEmployeeModal}
          onAddEmployee={handleAddEmployee}
        />
        {/* Edit Employee Modal */}
        <EditEmployeeModal
          isOpen={isEditEmployeeModalOpen}
          onClose={handleCloseEditEmployeeModal}
          onEditEmployee={handleEditEmployee}
          employeeData={selectedEmployee}
        />
        {/* Delete Employee Modal */}
        <DeleteEmployeeModal
          isOpen={isDeleteEmployeeModalOpen}
          onClose={handleCloseDeleteEmployeeModal}
          onDeleteEmployee={handleDeleteEmployeeSubmit}
          employeeData={selectedEmployee}
        />
        <LeaveRequestModal
          isOpen={isLeaveRequestModalOpen}
          onClose={handleCloseLeaveRequestModal}
          leaveRequest={selectedLeaveRequest}
          onApprove={handleApproveLeaveRequest}
          onDisapprove={handleDisapproveLeaveRequest}
        />
      </div>
    </>
  );
};



