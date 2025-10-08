import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { IoNotifications, IoSearch } from "react-icons/io5";
import profilePic from "../../assets/profile1.jpeg";
import { ImBooks } from "react-icons/im";
import { MdTimelapse } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";

function StudentDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      // If no user, redirect to login
      window.location.href = "/login";
    } else {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        
        {/* Sidebar on the left */}
        <Sidebar role="student" />

        {/* Main content on the right */}
        <div className="dashboard_main">
          
          {/* Top Navigation */}
          <div className="dashboard-main_nav">
            <div className="search">
              <input type="text" placeholder="Search..." />
              <IoSearch className="search_icon" />
            </div>

            <div className="dashboard-nav_right">
              <div className="notification">
                <IoNotifications className="notification_icon" />
              </div>

              <div className="user_profile">
                <img src={profilePic} alt="User Profile" className="user_image" />
                <span className="user_name">{user.firstName} {user.lastName}</span>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="dashboard_content">
            <div className="main-content_left">
              {/* Banner Section */}
              <div className="dashboard_banner">
                <h2>🎓 Welcome Back, {user.firstName}!</h2>
                <p>Keep pushing forward — you're doing great this semester!</p>
              </div>

              {/* Summary Cards */}
              <div className="dashboard_summary">
                <div className="summary_card">
                  <div className="card_header">
                    <span className="card_icon"><ImBooks /></span>
                    <h3>Registered Courses</h3>
                  </div>
                  <p className="card_description">You're enrolled in 5 active courses this semester</p>
                  <button className="card_button">View Courses</button>
                </div>

                <div className="summary_card">
                  <div className="card_header">
                    <span className="card_icon"><MdTimelapse /></span>
                    <h3>Pending Registrations</h3>
                  </div>
                  <p className="card_description">You have 2 courses pending registration</p>
                  <button className="card_button">Complete Now</button>
                </div>

                <div className="summary_card">
                  <div className="card_header">
                    <span className="card_icon"><GrScorecard /></span>
                    <h3>GPA</h3>
                  </div>
                  <p className="card_description">Your current GPA is 3.8</p>
                  <button className="card_button">View Transcript</button>
                </div>

                <div className="summary_card">
                  <div className="card_header">
                    <span className="card_icon"><IoNotifications /></span>
                    <h3>Notifications</h3>
                  </div>
                  <p className="card_description">You have 3 new notifications</p>
                  <button className="card_button">View All</button>
                </div>
              </div>

              {/* Courses Table */}
              <div className="courses_table">
                <h2>My Registered Courses</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Instructor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CSC101</td>
                      <td>Introduction to Computer Science</td>
                      <td>Dr. Smith</td>
                      <td>Active</td>
                    </tr>
                    <tr>
                      <td>MAT201</td>
                      <td>Calculus II</td>
                      <td>Prof. Wambui</td>
                      <td>Active</td>
                    </tr>
                    <tr>
                      <td>ENG103</td>
                      <td>English Composition</td>
                      <td>Mr. Kimani</td>
                      <td>Dropped</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="main-content_right">
              {/* Notifications Panel */}
              <div className="notifications_panel">
                <h2>Notifications</h2>
                <ul>
                  <li>Registration deadline: Oct 15</li>
                  <li>New course added: APT301</li>
                  <li>Lecture rescheduled for CSC205</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;