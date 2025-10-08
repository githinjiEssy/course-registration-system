import React from 'react';
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { IoIosListBox } from "react-icons/io";
import { toast } from 'react-toastify';
import logo from '../assets/logo.jpeg';

function Sidebar({ role }) {
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Optional: Add confirmation
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    // Clear user data
    localStorage.removeItem("user");
    
    // Show success message
    toast.success('Logged out successfully!', {
      position: "top-center",
      autoClose: 2000,
    });

    // Redirect to login page
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className='sidebar'>
        <div className="sidebar_container">
            <div className="sidebar_header">
                <img src={logo} alt="SmartPortal Logo" className='logo'/>
                <h1>SmartPortal</h1>
            </div>

            <div className="sidebar_menu">
                <ul className='sidebar_list'>
                    {/* Student specific links */}
                    {role === "student" && (
                        <>
                            <li className='list_item'><a href="/student"><BiSolidDashboard />Dashboard</a></li>
                            <li className='list_item'><a href="/course_registration"><MdOutlineAppRegistration/>Register Courses</a></li>
                            <li className='list_item'><a href="/my_courses"><ImBooks/>My Courses</a></li>
                        </>
                    )}

                    {/* Instructor specific links */}
                    {role === "instructor" && (
                        <>
                            <li className='list_item'><a href="/instructor"><BiSolidDashboard />Dashboard</a></li>
                            <li className='list_item'><a href="/lecturer_course_registration"><MdOutlineAppRegistration/>Register Courses</a></li>
                            <li className='list_item'><a href="/assigned_courses"><ImBooks/>Assigned Courses</a></li>
                        </>
                    )}

                    {/* Common links for both roles */}
                    <li className='list_item'><a href="/profile"><CgProfile/>Profile</a></li>
                    
                    {/* Logout with proper event handling */}
                    <li className='list_item'>
                      <a href="#" onClick={handleLogout} className="logout-link">
                        <BiLogOut/>Logout
                      </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Sidebar;