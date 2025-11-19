import React from 'react'
import { Outlet } from 'react-router-dom'
// components
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'

const Layout = ()=>{
    return (
         <div className="drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <Navbar />
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Sidebar />
                </ul>
            </div>
        </div>
    )
}


export default Layout