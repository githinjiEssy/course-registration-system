import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user and their registered courses from backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    if (user && user._id) {
      fetchCourses(user._id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCourses = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/students/${studentId}/my-courses`);
      setCourses(res.data.registeredCourses || []);
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDropCourse = async (courseId) => {
    if (!currentUser) return;

    if (window.confirm("Are you sure you want to drop this course?")) {
      try {
        await axios.put(`http://localhost:5000/students/${currentUser._id}/drop-course`, {
          courseId,
        });
        alert("✅ Course dropped successfully");
        fetchCourses(currentUser._id);
      } catch (error) {
        console.error("❌ Error dropping course:", error);
        alert("Failed to drop course");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

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
                            <h4>{course.courseTitle}</h4>
                            <p>{course.courseCode}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>
                          {course.lecturerName || "N/A"}
                        </span>
                      </td>
                      <td>{getStatusBadge(course.status || "Active")}</td>
                      <td>
                        {course.status !== "Dropped" && (
                          <button
                            className="drop_btn"
                            onClick={() => handleDropCourse(course.courseId)}
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
