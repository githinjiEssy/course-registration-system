import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LecturerCourseRegistration() {
  const courseOptions = [
    "Web Application Development",
    "Database Systems",
    "Artificial Intelligence",
    "Mobile Application Development",
    "Computer Networks",
    "Operating Systems"
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);
  const maxCourses = 3;

  const handleCourseChange = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      if (selectedCourses.length >= maxCourses) {
        toast.error(`⚠️ You can only teach up to ${maxCourses} courses.`, {
          position: "top-center",
        });
        return;
      }
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course to teach.", {
        position: "top-center",
      });
      return;
    }

    toast.success("✅ Courses registered successfully!", {
      position: "top-center",
    });

    console.log("Lecturer registered courses:", selectedCourses);
  };

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="lecturer_course_main">
          <h2><FaChalkboardTeacher /> Lecturer Course Registration</h2>
          <p>Select up to {maxCourses} courses you would like to teach.</p>

          <form className="lecturer_form" onSubmit={handleSubmit}>
            <div className="checkbox_group">
              {courseOptions.map((course, index) => (
                <label key={index} className="checkbox_item">
                  <input
                    type="checkbox"
                    value={course}
                    checked={selectedCourses.includes(course)}
                    onChange={() => handleCourseChange(course)}
                  />
                  {course}
                </label>
              ))}
            </div>

            <button type="submit" className="register_btn">Submit Courses</button>
          </form>

          <div className="summary_section">
            <h3>Selected Courses</h3>
            <ul>
              {selectedCourses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
              {selectedCourses.length === 0 && <p>No courses selected yet.</p>}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LecturerCourseRegistration;
