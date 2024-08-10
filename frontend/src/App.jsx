/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Register";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { ApplyLeave } from "./pages/ApplyLeave";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/leave" element={<ApplyLeave />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
