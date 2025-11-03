import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LecturerCourseRegistration() {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxCourses = 3;
  const navigate = useNavigate();

  // Get current lecturer
  const currentLecturer = JSON.parse(localStorage.getItem("user"));

  // Fetch available courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/courses/all-courses");
        
        if (Array.isArray(res.data)) {
          setAvailableCourses(res.data);
        } else {
          setAvailableCourses([]);
          toast.info("No courses available for registration.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
        setAvailableCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (course) => {
    if (selectedCourses.some(c => c._id === course._id)) {
      setSelectedCourses(selectedCourses.filter((c) => c._id !== course._id));
    } else {
      if (selectedCourses.length >= maxCourses) {
        toast.error(`⚠️ You can only teach up to ${maxCourses} courses.`);
        return;
      }
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course to teach.");
      return;
    }

    try {
      // Register lecturer for selected courses
      const response = await axios.post("http://localhost:5000/instructors/register-courses", {
        instructorId: currentLecturer._id,
        courseIds: selectedCourses.map(course => course._id)
      });

      toast.success("✅ Courses registered successfully!", {
        onClose: () => navigate("/instructor")
      });

      console.log("Courses registration response:", response.data);

    } catch (error) {
      console.error("Error registering courses:", error);
      if (error.response?.data?.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else {
        toast.error("❌ Failed to register courses. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="instructor" />
          <div className="lecturer_course_main">
            <div className="loading-container">
              <p>Loading available courses...</p>
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

        <div className="lecturer_course_main">
          <h2><FaChalkboardTeacher /> Lecturer Course Registration</h2>
          <p>Select up to {maxCourses} courses you would like to teach.</p>

          <form className="lecturer_form" onSubmit={handleSubmit}>
            <div className="checkbox_group">
              {availableCourses.length === 0 ? (
                <p className="no-courses">No courses available for registration.</p>
              ) : (
                availableCourses.map((course) => (
                  <label key={course._id} className="checkbox_item">
                    <input
                      type="checkbox"
                      checked={selectedCourses.some(c => c._id === course._id)}
                      onChange={() => handleCourseChange(course)}
                      disabled={course.instructors && course.instructors.length > 0}
                    />
                    <span className="course_info">
                      <strong>{course.code}</strong> - {course.title}
                      {course.instructors && course.instructors.length > 0 && (
                        <span className="assigned-badge">(Already assigned)</span>
                      )}
                    </span>
                  </label>
                ))
              )}
            </div>

            {availableCourses.length > 0 && (
              <button type="submit" className="register_btn" disabled={selectedCourses.length === 0}>
                Submit Courses
              </button>
            )}
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