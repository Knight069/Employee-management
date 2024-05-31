/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Appbar } from "../components/Appbar"
import { AdminDashboard } from '../components/AdminDashboard'
import { EmployeeDashboard } from '../components/EmployeeDashboard'

export const Dashboard = ({ role }) => {
  return (
    <>
    <Appbar />

    {role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </>
  )
}

