import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FaArrowLeft, FaUserGraduate, FaEnvelope, FaIdCard } from "react-icons/fa";
import axios from "axios";

function StudentList() {
  const { courseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [course, setCourse] = useState(state?.course || null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔍 Fetching data for course ID:", courseId);

        // If course data wasn't passed via state, fetch it from the API
        if (!course) {
          try {
            const courseRes = await axios.get(`http://localhost:5000/courses/${courseId}`);
            console.log("✅ Course data:", courseRes.data);
            setCourse(courseRes.data);
          } catch (courseError) {
            console.error("❌ Error fetching course:", courseError);
            // Continue even if course fetch fails, we can still try to get students
          }
        }

        // Fetch enrolled students
        console.log("📋 Fetching enrolled students...");
        const studentsRes = await axios.get(`http://localhost:5000/courses/${courseId}/enrolled-students`);
        console.log("📊 Students response:", studentsRes.data);
        
        if (studentsRes.status === 200) {
          setStudents(studentsRes.data);
        }
      } catch (error) {
        console.error("❌ Error fetching student data:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to load student data";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseAndStudents();
    } else {
      setError("No course ID provided");
      setLoading(false);
    }
  }, [courseId, course]);

  // Test the debug endpoint
  const testDebugEndpoint = async () => {
    try {
      const debugRes = await axios.get(`http://localhost:5000/courses/${courseId}/debug-enrollment`);
      console.log("🐛 Debug endpoint result:", debugRes.data);
    } catch (debugError) {
      console.error("❌ Debug endpoint failed:", debugError);
    }
  };

  // Call debug endpoint on component mount
  useEffect(() => {
    if (courseId) {
      testDebugEndpoint();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="instructor" />
          <div className="student_list_main">
            <div className="loading-container">
              <h3>Loading students...</h3>
              <p>Please wait while we fetch the student data.</p>
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
          <div className="student_list_main">
            <div className="error-message">
              <h3>Error Loading Students</h3>
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={() => window.location.reload()} className="retry-btn">
                  Try Again
                </button>
                <button onClick={() => navigate("/instructor")} className="back_btn">
                  <FaArrowLeft /> Back to Dashboard
                </button>
              </div>
              {/*<div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
                <p>Debug info:</p>
                <p>Course ID: {courseId}</p>
                <p>Course Data: {course ? 'Loaded' : 'Not loaded'}</p>
                <p>Students Count: {students.length}</p>
               </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="student_list_main">
          <div className="header_section">
            <button className="back_btn" onClick={() => navigate("/instructor")}>
              <FaArrowLeft /> Back to Dashboard
            </button>
            <div className="header_content">
              <h2>
                <FaUserGraduate /> Students Enrolled in {course?.title || "Course"}
              </h2>
              <p className="course_code">
                {course?.code || courseId} • {students.length} students
              </p>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty_state">
              <h3>No students enrolled yet</h3>
              <p>Students will appear here once they register for this course.</p>
              <button onClick={() => testDebugEndpoint()} className="retry-btn" style={{ marginTop: '10px' }}>
                Check Debug Info
              </button>
            </div>
          ) : (
            <div className="student_table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>ID Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>
                        <FaUserGraduate className="icon" /> {student.firstName} {student.lastName}
                      </td>
                      <td>
                        <FaEnvelope className="icon" /> {student.email}
                      </td>
                      <td>
                        <FaIdCard className="icon" /> {student.idNumber || "N/A"}
                      </td>
                      <td>
                        <span className="status status-active">Active</span>
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

export default StudentList;