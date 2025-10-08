import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user and their courses
    const user = JSON.parse(localStorage.getItem("user"));
    const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || {};
    
    setCurrentUser(user);
    
    if (user && studentCourses[user.email]) {
      setCourses(studentCourses[user.email]);
    } else {
      // If no courses found, show empty state
      setCourses([]);
    }
  }, []);

  const getStatusBadge = (status) => {
    const badgeStyles = {
      Active: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Dropped: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          badgeStyles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const handleNewCourse = () => {
    navigate("/course_registration");
  };

  const handleDropCourse = (courseCode) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || {};
      if (currentUser && studentCourses[currentUser.email]) {
        const updatedCourses = studentCourses[currentUser.email].map(course =>
          course.code === courseCode ? { ...course, status: "Dropped" } : course
        );
        studentCourses[currentUser.email] = updatedCourses;
        localStorage.setItem("studentCourses", JSON.stringify(studentCourses));
        setCourses(updatedCourses);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="student" />

        <div className="mycourses_main">
          <div className="header_section">
            <h2>My Registered Courses</h2>
            <button className="new_btn" onClick={handleNewCourse}>
              + Register New Courses
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="empty_state">
              <h3>No courses registered yet</h3>
              <p>Start by registering for courses to see them here.</p>
              <button className="new_btn" onClick={handleNewCourse}>
                Register Your First Course
              </button>
            </div>
          ) : (
            <div className="courses_table modern_table">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, i) => (
                    <tr key={i}>
                      <td>
                        <div className="course_info">
                          <div>
                            <h4>{course.title}</h4>
                            <p>{course.code}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="lecturer_info flex items-center gap-3">
                          <img
                            src={course.lecturerImg}
                            alt={course.lecturer}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span>{course.lecturer}</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(course.status)}</td>
                      <td>
                        {course.status === "Active" && (
                          <button
                            className="drop_btn"
                            onClick={() => handleDropCourse(course.code)}
                          >
                            Drop
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;