import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { FaBook, FaUserGraduate } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseRegistration() {
  // Sample course and lecturer data
  const courseOptions = [
    "Web Application Development",
    "Database Systems",
    "Artificial Intelligence",
    "Mobile Application Development",
    "Computer Networks",
    "Operating Systems",
  ];

  const lecturerOptions = ["Dr. Kamau", "Dr. Mutua", "Dr. Wanjiru", "Prof. Ouma"];

  // State for 5 course selections
  const [registrations, setRegistrations] = useState([
    { course: "", lecturer: "" },
    { course: "", lecturer: "" },
    { course: "", lecturer: "" },
    { course: "", lecturer: "" },
    { course: "", lecturer: "" },
  ]);

  // Handle selection change
  const handleChange = (index, field, value) => {
    const updated = [...registrations];
    updated[index][field] = value;
    setRegistrations(updated);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCourses = registrations.filter((r) => r.course && r.lecturer);

    if (selectedCourses.length === 0) {
      toast.error("⚠️ Please select at least one course and lecturer.", {
        position: "top-center",
      });
      return;
    }

    toast.success("✅ Registration submitted successfully!", {
      position: "top-center",
    });

    console.log("Registered Courses:", selectedCourses);
  };

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="student" />

        <div className="course-registration_main">
          <h2>Course Registration</h2>

          <div className="course_info">
            <div className="left_panel">
              {/* Course Selection Section */}
              <div className="course_selection_section">
                <h3>Select Courses and Lecturers (max 5)</h3>
                <form className="course_form" onSubmit={handleSubmit}>
                  {registrations.map((reg, index) => (
                    <div className="course_row" key={index}>
                      <div className="form_group">
                        <label>Course {index + 1}</label>
                        <select
                          value={reg.course}
                          onChange={(e) =>
                            handleChange(index, "course", e.target.value)
                          }
                        >
                          <option value="">Select Course</option>
                          {courseOptions.map((course, i) => (
                            <option key={i} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form_group">
                        <label>Lecturer</label>
                        <select
                          value={reg.lecturer}
                          onChange={(e) =>
                            handleChange(index, "lecturer", e.target.value)
                          }
                        >
                          <option value="">Select Lecturer</option>
                          {lecturerOptions.map((lect, i) => (
                            <option key={i} value={lect}>
                              {lect}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  <button className="register_btn" type="submit">
                    Submit Registration
                  </button>
                </form>
              </div>

              {/* Summary */}
              <div className="registration_summary">
                <h3>Registration Summary</h3>
                <div className="summary_box">
                  <ul>
                    {registrations
                      .filter((r) => r.course && r.lecturer)
                      .map((r, i) => (
                        <li key={i}>
                          <FaBook /> {r.course} — {r.lecturer}
                        </li>
                      ))}
                  </ul>
                  {registrations.filter((r) => r.course && r.lecturer).length ===
                    0 && <p>No courses selected yet.</p>}
                </div>
              </div>
            </div>

            <div className="right_panel">
              {/* Student Info Section */}
              <div className="student_info_display">
                <h3>
                  <FaUserGraduate /> Student Information
                </h3>
                <div className="student_info_grid">
                  <div className="info_row">
                    <strong>Full Name:</strong> John Doe
                  </div>
                  <div className="info_row">
                    <strong>ID Number:</strong> 12345
                  </div>
                  <div className="info_row">
                    <strong>Email:</strong> john.doe@usiu.ac.ke
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CourseRegistration;
