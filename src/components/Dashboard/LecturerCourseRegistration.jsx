import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LecturerCourseRegistration() {
  const courseOptions = [
    { code: "APT301", title: "Web Application Development" },
    { code: "APT302", title: "Database Systems" },
    { code: "APT303", title: "Artificial Intelligence" },
    { code: "APT304", title: "Mobile Application Development" },
    { code: "APT305", title: "Computer Networks" },
    { code: "APT306", title: "Operating Systems" }
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);
  const maxCourses = 3;
  const navigate = useNavigate();

  // Get current lecturer
  const currentLecturer = JSON.parse(localStorage.getItem("user"));

  const handleCourseChange = (course) => {
    if (selectedCourses.some(c => c.code === course.code)) {
      setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code));
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

    // Save lecturer courses to localStorage
    const lecturerCourses = JSON.parse(localStorage.getItem("lecturerCourses")) || {};
    lecturerCourses[currentLecturer.email] = selectedCourses.map(course => ({
      ...course,
      lecturer: `${currentLecturer.firstName} ${currentLecturer.lastName}`,
      lecturerEmail: currentLecturer.email,
      status: "Ongoing",
      schedule: generateSchedule(), // You can make this dynamic
      registrationDate: new Date().toISOString()
    }));

    localStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses));

    toast.success("✅ Courses registered successfully!", {
      position: "top-center",
      onClose: () => navigate("/assigned_courses")
    });

    console.log("Lecturer registered courses:", selectedCourses);
  };

  // Helper function to generate random schedule
  const generateSchedule = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const times = [
      "9:00 AM - 11:00 AM",
      "10:00 AM - 12:00 PM", 
      "2:00 PM - 4:00 PM",
      "3:00 PM - 5:00 PM"
    ];
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    return `${randomDay} ${randomTime}`;
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
                    checked={selectedCourses.some(c => c.code === course.code)}
                    onChange={() => handleCourseChange(course)}
                  />
                  <span className="course_info">
                    <strong>{course.code}</strong> - {course.title}
                  </span>
                </label>
              ))}
            </div>

            <button type="submit" className="register_btn">Submit Courses</button>
          </form>

          <div className="summary_section">
            <h3>Selected Courses ({selectedCourses.length}/{maxCourses})</h3>
            <ul>
              {selectedCourses.map((course, i) => (
                <li key={i}>
                  <strong>{course.code}</strong> - {course.title}
                </li>
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