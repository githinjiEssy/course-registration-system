import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FaArrowLeft, FaUserGraduate, FaEnvelope, FaIdCard } from "react-icons/fa";

function StudentList() {
  const { courseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  console.log("StudentList - Course ID:", courseId);
  console.log("StudentList - State:", state);
  
  // Get course data from state
  let course = state?.course;

  if (!course) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="instructor" />
          <div className="error_page">
            <h2>⚠️ Course data not found</h2>
            <p>No course data was passed to this page.</p>
            <p>Course ID from URL: {courseId}</p>
            <button onClick={() => navigate("/assigned_courses")} className="back_btn">
              <FaArrowLeft /> Back to Courses
            </button>
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
            <button className="back_btn" onClick={() => navigate("/assigned_courses")}>
              <FaArrowLeft /> Back to Courses
            </button>
            <div className="header_content">
              <h2>
                <FaUserGraduate /> Students Enrolled in {course.title}
              </h2>
              <p className="course_code">{course.code} • {course.students?.length || 0} students</p>
            </div>
          </div>

          {(!course.students || course.students.length === 0) ? (
            <div className="empty_state">
              <h3>No students enrolled yet</h3>
              <p>Students will appear here once they register for this course.</p>
            </div>
          ) : (
            <div className="student_table">
              <div style={{ marginBottom: '10px', padding: '10px', background: '#f0f8ff', borderRadius: '5px' }}>
                <strong>Debug Info:</strong> Showing {course.students.length} students for {course.code}
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>ID Number</th>
                  </tr>
                </thead>
                <tbody>
                  {course.students.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <FaUserGraduate className="icon" /> {student}
                      </td>
                      <td>
                        <FaEnvelope className="icon" /> 
                        {student.toLowerCase().replace(/\s+/g, '.')}@usiu.ac.ke
                      </td>
                      <td>
                        <FaIdCard className="icon" /> 
                        {`APT${String(index + 1).padStart(3, '0')}`}
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