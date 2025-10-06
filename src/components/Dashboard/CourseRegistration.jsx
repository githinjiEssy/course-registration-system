import React from 'react';
import Sidebar from '../Sidebar';
import { FaBook, FaUserGraduate } from 'react-icons/fa'; // Font Awesome icon

function CourseRegistration() {
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
                <h3>Select Courses and Lecturers</h3>
                <form className="course_form">
                  <div className="course_row">
                    <div className="form_group">
                      <label>Course 1</label>
                      <select>
                        <option>Web Application Development</option>
                        <option>Database Systems</option>
                      </select>
                    </div>
                    <div className="form_group">
                      <label>Lecturer</label>
                      <select>
                        <option>Dr. Kamau</option>
                        <option>Dr. Mutua</option>
                      </select>
                    </div>
                  </div>

                  <div className="course_row">
                    <div className="form_group">
                      <label>Course 2</label>
                      <select>
                        <option>Web Application Development</option>
                        <option>Database Systems</option>
                      </select>
                    </div>
                    <div className="form_group">
                      <label>Lecturer</label>
                      <select>
                        <option>Dr. Kamau</option>
                        <option>Dr. Mutua</option>
                      </select>
                    </div>
                  </div>

                  <div className="course_row">
                    <div className="form_group">
                      <label>Course 3</label>
                      <select>
                        <option>Web Application Development</option>
                        <option>Database Systems</option>
                      </select>
                    </div>
                    <div className="form_group">
                      <label>Lecturer</label>
                      <select>
                        <option>Dr. Kamau</option>
                        <option>Dr. Mutua</option>
                      </select>
                    </div>
                  </div>

                  <div className="course_row">
                    <div className="form_group">
                      <label>Course 4</label>
                      <select>
                        <option>Web Application Development</option>
                        <option>Database Systems</option>
                      </select>
                    </div>
                    <div className="form_group">
                      <label>Lecturer</label>
                      <select>
                        <option>Dr. Kamau</option>
                        <option>Dr. Mutua</option>
                      </select>
                    </div>
                  </div>

                  <div className="course_row">
                    <div className="form_group">
                      <label>Course 5</label>
                      <select>
                        <option>Web Application Development</option>
                        <option>Database Systems</option>
                      </select>
                    </div>
                    <div className="form_group">
                      <label>Lecturer</label>
                      <select>
                        <option>Dr. Kamau</option>
                        <option>Dr. Mutua</option>
                      </select>
                    </div>
                  </div>

                  <button className="register_btn">Submit Registration</button>
                </form>
              </div>

              {/* Summary */}
              <div className="registration_summary">
                <h3>Registration Summary</h3>
                <div className="summary_box">
                  <ul>
                    <li><FaBook /> Web Application Development — Dr. Kamau</li>
                    <li><FaBook /> Database Systems — Dr. Mutua</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="right_panel">
              {/* Student Info Section */}
              <div className="student_info_display">
                <h3><FaUserGraduate /> Student Information</h3>
                <div className="student_info_grid">
                  <div className="info_row"><strong>Full Name:</strong> John Doe</div>
                  <div className="info_row"><strong>ID Number:</strong> 12345</div>
                  <div className="info_row"><strong>Email:</strong> john.doe@usiu.ac.ke</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
