import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaBookOpen, FaUsers, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AssignedCourses() {
  const navigate = useNavigate();
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [currentLecturer, setCurrentLecturer] = useState(null);

  useEffect(() => {
    // Get current lecturer
    const lecturer = JSON.parse(localStorage.getItem("user"));
    setCurrentLecturer(lecturer);

    if (lecturer) {
      // Load assigned courses for this lecturer
      const lecturerCourses = JSON.parse(localStorage.getItem("lecturerCourses")) || {};
      const myCourses = lecturerCourses[lecturer.email] || [];
      
      // Load student counts and student data
      const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || {};
      const allStudents = JSON.parse(localStorage.getItem("students")) || [];
      
      const coursesWithStudents = myCourses.map(course => {
        const courseStudents = [];

        // Find all students registered for this course
        Object.entries(studentCourses).forEach(([studentEmail, courses]) => {
          const courseRegistration = courses.find(c => 
            c.title === course.title && c.status === "Active"
          );
          
          if (courseRegistration) {
            const student = allStudents.find(s => s.email === studentEmail);
            if (student) {
              courseStudents.push(`${student.firstName} ${student.lastName}`);
            }
          }
        });

        return {
          ...course,
          students: courseStudents,
          studentCount: courseStudents.length
        };
      });

      setAssignedCourses(coursesWithStudents);
    }
  }, []);

  const handleViewStudents = (course) => {
    console.log("Button clicked for course:", course);
    console.log("Course code:", course.code);
    
    // Navigate to StudentList with course data in state
    navigate(`/student_list/${course.code}`, { 
      state: { course } 
    });
  };

  // Test navigation directly
  const testNavigation = () => {
    navigate('/student_list/APT301');
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
            
            {/* Test button - remove this after testing */}
            <button 
              onClick={testNavigation} 
              style={{marginLeft: '10px', background: 'orange'}}
            >
              Test Navigation
            </button>
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
                    <tr key={index}>
                      <td>{course.code}</td>
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
                        >
                          {course.studentCount === 0 ? 'No Students' : 'View Students'}
                        </button>
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