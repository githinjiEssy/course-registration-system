import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdOutlineAppRegistration } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function InstructorDashboard() {
  const [user, setUser] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Get logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    if (loggedInUser.role !== "instructor") {
      navigate("/student");
      return;
    }

    setUser(loggedInUser);

    // Load assigned courses for this lecturer
    const lecturerCourses = JSON.parse(localStorage.getItem("lecturerCourses")) || {};
    const myCourses = lecturerCourses[loggedInUser.email] || [];

    // Calculate student counts
    const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || {};
    const courseStudentCounts = {};

    Object.values(studentCourses).forEach(studentCourseList => {
      studentCourseList.forEach(course => {
        if (myCourses.some(c => c.title === course.title)) {
          courseStudentCounts[course.title] = (courseStudentCounts[course.title] || 0) + 1;
        }
      });
    });

    setAssignedCourses(myCourses);
    setStudentCounts(courseStudentCounts);
  }, [navigate]);

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
        <Sidebar role="instructor" />

        <div className="instructor_dashboard_main">
          <h2>Welcome back, {user.firstName} {user.lastName}</h2>
          <p className="subtitle">Here's an overview of your teaching activities.</p>

          <div className="instructor_stats">
            <div className="stat_card">
              <FaChalkboardTeacher className="icon" />
              <div>
                <h3>{assignedCourses.length}</h3>
                <p>Courses Teaching</p>
              </div>
            </div>

            <div className="stat_card">
              <MdGroups className="icon" />
              <div>
                <h3>
                  {Object.values(studentCounts).reduce((a, b) => a + b, 0)}
                </h3>
                <p>Total Students</p>
              </div>
            </div>

            <div className="stat_card">
              <MdOutlineAppRegistration className="icon" />
              <div>
                <h3>3</h3>
                <p>Pending Approvals</p>
              </div>
            </div>
          </div>

          <div className="assigned_courses">
            <h3>Assigned Courses</h3>
            {assignedCourses.length === 0 ? (
              <div className="empty_state">
                <p>No courses assigned yet.</p>
                <a href="/lecturer_register_courses" className="quick_btn">
                  Register Courses
                </a>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Students Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedCourses.map((course, i) => (
                    <tr key={i}>
                      {/* FIX: Make sure you're rendering course.title, not the course object */}
                      <td>{course.title || course.name || "Unnamed Course"}</td>
                      <td>{studentCounts[course.title] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="quick_links">
            <a href="/lecturer_register_courses" className="quick_btn">
              Register Courses
            </a>
            <a href="/student_list" className="quick_btn">
              View Student List
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;