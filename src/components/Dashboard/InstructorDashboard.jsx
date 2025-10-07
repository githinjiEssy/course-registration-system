import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdOutlineAppRegistration } from "react-icons/md";

function InstructorDashboard() {
  const [lecturerName, setLecturerName] = useState("Dr. Peter Kamau");
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});

  useEffect(() => {
    // Example mock data
    const storedCourses = JSON.parse(localStorage.getItem("lecturerCourses")) || [
      "Database Systems",
      "Web Application Development",
    ];

    // Example of student count mockup
    const mockStudentCounts = {
      "Database Systems": 32,
      "Web Application Development": 28,
      "Artificial Intelligence": 20,
    };

    setAssignedCourses(storedCourses);
    setStudentCounts(mockStudentCounts);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="instructor_dashboard_main">
          <h2>Welcome back, {lecturerName}</h2>
          <p className="subtitle">Here’s an overview of your teaching activities.</p>

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
                  {Object.values(studentCounts)
                    .slice(0, assignedCourses.length)
                    .reduce((a, b) => a + b, 0)}
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
                    <td>{course}</td>
                    <td>{studentCounts[course] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="quick_links">
            <a href="/lecturer_register_courses" className="quick_btn">Register Courses</a>
            <a href="/student_list" className="quick_btn">View Student List</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
