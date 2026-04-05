import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    // min-h-screen ensures it fills the page height
    // flex-row (default) puts sidebar and content side-by-side
    <div className="flex min-h-screen bg-gray-300">
      
      {/* LEFT SIDE: Sidebar */}
      <AdminNavbar />

      {/* RIGHT SIDE: Main Content */}
      <main className=" p-8">
        <Outlet />
      </main>

    </div>
  )
}

export default Dashboard