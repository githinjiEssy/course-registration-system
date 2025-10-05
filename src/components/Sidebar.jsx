import React from 'react';
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { IoIosListBox } from "react-icons/io";

function Sidebar({ role }) {
  return (
    <div className='sidebar'>
        <div className="sidebar_container">
            <div className="sidebar_header">
                <img src="" alt="" className='logo'/>
                <h1>SmartPortal</h1>
            </div>

            <div className="sidebar_menu">
                <ul>
                    <li><a href="#"><BiSolidDashboard />Dashboard</a></li>

                    {/* Student specific links */}
                    {role === "student" && (
                        <>
                            <li><a href="#"><MdOutlineAppRegistration/>Register Courses</a></li>
                            <li><a href="#"><ImBooks/>My Courses</a></li>
                        </>
                    )}

                    {/* Instructor specific links */}
                    {role === "instructor" && (
                        <>
                            <li><a href="#"><ImBooks/>Assigned Courses</a></li>
                            <li><a href="#"><IoIosListBox/>Student List</a></li>
                        </>
                    )}

                    <li><a href="#"><CgProfile/>Profile</a></li>
                    <li><a href="#"><BiLogOut/>Logout</a></li>
                </ul>
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
