import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FaArrowLeft, FaUserGraduate } from "react-icons/fa";

function StudentList() {
  const { courseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  if (!course) {
    return (
      <div className="error_page">
        <h2>⚠️ Course data not found</h2>
        <button onClick={() => navigate(-1)} className="back_btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="student_list_main">
          <div className="header_section">
            <button className="back_btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </button>
            <h2>
              <FaUserGraduate /> Students Enrolled in {course.title}
            </h2>
          </div>

          <div className="student_table">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student}</td>
                    <td>{student.toLowerCase().replace(" ", ".")}@example.com</td>
                    <td>{Math.floor(Math.random() * 4) + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
