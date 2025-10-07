import React from 'react';
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { IoIosListBox } from "react-icons/io";
import logo from '../assets/logo.jpeg';

function Sidebar({ role }) {
  return (
    <div className='sidebar'>
        <div className="sidebar_container">
            <div className="sidebar_header">
                <img src={logo} alt="" className='logo'/>
                <h1>SmartPortal</h1>
            </div>

            <div className="sidebar_menu">
                <ul className='sidebar_list'>
                    {/* <li className='list_item'><a href="/"><BiSolidDashboard />Dashboard</a></li> */}

                    {/* Student specific links */}
                    {role === "student" && (
                        <>
                            <li className='list_item'><a href="/student"><BiSolidDashboard />Dashboard</a></li>
                            <li className='list_item'><a href="/course_registration"><MdOutlineAppRegistration/>Register Courses</a></li>
                            <li className='list_item'><a href="my_courses"><ImBooks/>My Courses</a></li>
                        </>
                    )}

                    {/* Instructor specific links */}
                    {role === "instructor" && (
                        <>
                            <li className='list_item'><a href="/instructor"><BiSolidDashboard />Dashboard</a></li>
                            <li className='list_item'><a href="#"><ImBooks/>Assigned Courses</a></li>
                            <li className='list_item'><a href="#"><IoIosListBox/>Student List</a></li>
                        </>
                    )}

                    <li className='list_item'><a href="#"><BiLogOut/>Logout</a></li>
                </ul>
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
