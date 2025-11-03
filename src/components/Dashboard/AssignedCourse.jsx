import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaBookOpen, FaUsers, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AssignedCourses() {
  const navigate = useNavigate();
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [currentLecturer, setCurrentLecturer] = useState(null);

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      const lecturer = JSON.parse(localStorage.getItem("user"));
      setCurrentLecturer(lecturer);

      if (!lecturer || lecturer.role !== "instructor") return;

      try {
        const res = await fetch(`http://localhost:5000/instructors/${lecturer._id}/assigned-courses`);
        const data = await res.json();

        console.log("📊 Raw assigned courses data:", data);

        if (res.ok && Array.isArray(data)) {
          // ✅ PRESERVE THE _id FIELD
          const formattedCourses = data.map(course => ({
            _id: course._id, // ✅ This is the crucial line you're missing!
            code: course.code,
            title: course.title,
            status: "Ongoing",
            schedule: "Mon & Wed 10:00 AM - 12:00 PM",
            studentCount: course.enrolledStudents?.length || 0,
            students: course.enrolledStudents?.map(
              s => `${s.firstName} ${s.lastName}`
            ) || []
          }));

          console.log("✅ Formatted courses with IDs:", formattedCourses);
          setAssignedCourses(formattedCourses);
        } else {
          console.log("❌ No courses found or invalid response");
          setAssignedCourses([]);
        }
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
        setAssignedCourses([]);
      }
    };

    fetchAssignedCourses();
  }, []);

  const handleViewStudents = (course) => {
    console.log("🔍 View Students clicked for course:", course);
    console.log("📝 Course ID:", course._id);
    console.log("📝 Course Code:", course.code);
    
    if (!course._id) {
      console.error("❌ ERROR: Course _id is missing!");
      alert("Error: Course ID is missing. Please check the console for details.");
      return;
    }

    // Navigate to StudentList with course data in state
    navigate(`/student_list/${course._id}`, { 
      state: { course } 
    });
  };

  if (!currentLecturer) {
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

        <div className="assigned_main">
          <div className="header_section">
            <h2>
              <FaBookOpen /> Assigned Courses
            </h2>
            <p>Courses you are currently teaching</p>
          </div>

          {assignedCourses.length === 0 ? (
            <div className="empty_state">
              <h3>No courses assigned yet</h3>
              <p>Register for courses to start teaching.</p>
              <button 
                className="register_btn" 
                onClick={() => navigate("/lecturer_course_registration")}
              >
                Register Courses
              </button>
            </div>
          ) : (
            <div className="assigned_table">
              <div style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                background: '#f0f8ff', 
                borderRadius: '5px',
                fontSize: '0.9rem'
              }}>
                <strong>Debug Info:</strong> Showing {assignedCourses.length} courses
                {assignedCourses.length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    Course IDs: {assignedCourses.map(c => c._id).join(', ')}
                  </div>
                )}
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Students Enrolled</th>
                    <th>Schedule</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedCourses.map((course, index) => (
                    <tr key={course._id || index}>
                      <td>
                        {course.code}
                      </td>
                      <td>{course.title}</td>
                      <td>
                        <FaUsers className="icon" /> {course.studentCount} students
                      </td>
                      <td>
                        <FaClock className="icon" /> {course.schedule}
                      </td>
                      <td>
                        <span
                          className={`status ${
                            course.status === "Ongoing"
                              ? "status-active"
                              : "status-upcoming"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view_btn"
                          onClick={() => handleViewStudents(course)}
                          disabled={course.studentCount === 0}
                          style={{
                            cursor: course.studentCount === 0 ? 'not-allowed' : 'pointer',
                            opacity: course.studentCount === 0 ? 0.6 : 1
                          }}
                        >
                          {course.studentCount === 0 ? 'No Students' : 'View Students'}
                        </button>
                        {!course._id && (
                          <div style={{ fontSize: '0.7rem', color: 'red', marginTop: '2px' }}>
                            No ID!
                          </div>
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

export default AssignedCourses;