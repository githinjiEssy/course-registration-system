import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdOutlineAppRegistration } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InstructorDashboard() {
  const [user, setUser] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    
    // Enhanced validation
    if (!loggedInUser) {
      console.log("❌ No user found in localStorage");
      navigate("/login");
      return;
    }

    // Validate user object structure
    if (!loggedInUser._id || typeof loggedInUser._id !== 'string') {
      console.error("❌ Invalid user ID:", loggedInUser._id);
      setError("Invalid user data. Please log in again.");
      setLoading(false);
      return;
    }

    if (loggedInUser.role !== "instructor") {
      navigate("/student");
      return;
    }

    console.log("✅ User loaded:", { id: loggedInUser._id, name: loggedInUser.firstName });
    setUser(loggedInUser);

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Double-check the user ID before making the request
        if (!loggedInUser._id || loggedInUser._id === 'undefined') {
          throw new Error("Invalid user ID");
        }

        console.log("🔍 Fetching courses for instructor ID:", loggedInUser._id);
        
        const res = await axios.get(
          `http://localhost:5000/instructors/${loggedInUser._id}/assigned-courses`
        );
        
        console.log("✅ Courses fetched successfully:", res.data?.length || 0);
        setAssignedCourses(res.data || []);
      } catch (error) {
        console.error("❌ Error fetching assigned courses:", error);
        setError(`Failed to load assigned courses: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // ✅ Compute totals after data is loaded
  const totalCourses = assignedCourses.length;
  const totalStudents = assignedCourses.reduce(
    (sum, course) => sum + (course.enrolledStudents?.length || 0),
    0
  );

  // Calculate pending approvals
  const pendingApprovals = assignedCourses.reduce(
    (sum, course) => sum + (course.pendingApprovals || 0),
    0
  );

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="instructor" />
          <div className="instructor_dashboard_main">
            <div className="loading-container">
              <p>Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="instructor" />
          <div className="instructor_dashboard_main">
            <div className="error-message">
              <h3>Error Loading Dashboard</h3>
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={() => window.location.reload()} className="retry-btn">
                  Try Again
                </button>
                <button onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }} className="logout-btn">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

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
                <h3>{totalCourses}</h3>
                <p>Courses Teaching</p>
              </div>
            </div>

            <div className="stat_card">
              <MdGroups className="icon" />
              <div>
                <h3>{totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>

            <div className="stat_card">
              <MdOutlineAppRegistration className="icon" />
              <div>
                <h3>{pendingApprovals}</h3>
                <p>Pending Approvals</p>
              </div>
            </div>
          </div>

          <div className="assigned_courses">
            <h3>Assigned Courses</h3>
            {assignedCourses.length === 0 ? (
              <div className="empty_state">
                <p>No courses assigned yet.</p>
                <a href="/lecturer_course_registration" className="quick_btn">
                  Register Courses
                </a>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Code</th>
                    <th>Students Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedCourses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>{course.code}</td>
                      <td>{course.enrolledStudents?.length || 0}</td>
                      <td>
                        <button
                          className="view_btn"
                          onClick={() => navigate(`/student_list/${course._id}`)}
                        >
                          View Students
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="quick_links">
            <a href="/lecturer_course_registration" className="quick_btn">
              Register Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;