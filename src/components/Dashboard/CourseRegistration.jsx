import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaBook, FaUserGraduate, FaExclamationTriangle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CourseRegistration() {
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([
    { courseId: "", lecturerId: "" },
    { courseId: "", lecturerId: "" },
    { courseId: "", lecturerId: "" },
    { courseId: "", lecturerId: "" },
    { courseId: "", lecturerId: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [hasCourses, setHasCourses] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch courses from backend with proper error handling
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/courses/all-courses");
        
        // Check if response has courses array or a message
        if (Array.isArray(res.data)) {
          if (res.data.length > 0) {
            setCourses(res.data);
            setHasCourses(true);
            console.log(`✅ Loaded ${res.data.length} courses`);
          } else {
            setCourses([]);
            setHasCourses(false);
            toast.info("📚 No courses available for registration. Please contact administrator.");
          }
        } else if (res.data.message) {
          // Handle backend message (like "No courses found")
          setCourses([]);
          setHasCourses(false);
          toast.info(res.data.message);
        } else {
          setCourses([]);
          setHasCourses(false);
          toast.error("Unexpected response format from server");
        }
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        
        if (err.response) {
          // Server responded with error status
          if (err.response.status === 404) {
            toast.error("❌ Courses endpoint not found. Please check server configuration.");
          } else if (err.response.status === 500) {
            toast.error("❌ Server error. Please try again later.");
          } else {
            toast.error(`❌ Failed to load courses: ${err.response.data.message || err.response.status}`);
          }
        } else if (err.request) {
          // Request was made but no response received
          toast.error("❌ Cannot connect to server. Please check if the server is running.");
        } else {
          // Something else happened
          toast.error("❌ Failed to load courses. Please try again.");
        }
        
        setCourses([]);
        setHasCourses(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...registrations];
    updated[index][field] = value;
    setRegistrations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are courses available
    if (!hasCourses || courses.length === 0) {
      toast.error("❌ No courses available for registration.");
      return;
    }

    // Filter out empty selections and validate data
    const selected = registrations
      .filter(r => r.courseId && r.courseId.trim() !== '' && r.lecturerId && r.lecturerId.trim() !== '')
      .map(r => ({
        courseId: r.courseId.trim(),
        lecturerId: r.lecturerId.trim()
      }));

    console.log("📤 Submitting courses:", selected);

    if (selected.length === 0) {
      toast.error("⚠️ Please select at least one course and lecturer.");
      return;
    }

    if (selected.length > 5) {
      toast.error("⚠️ You can only register up to 5 courses.");
      return;
    }

    // Prevent selecting the same lecturer multiple times
    const lecturerSet = new Set(selected.map(r => r.lecturerId));
    if (lecturerSet.size < selected.length) {
      toast.error("⚠️ Each course must have a different lecturer.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/courses/register-courses", {
        studentId: currentUser._id,
        selectedCourses: selected,
      });

      toast.success(`✅ Registration successful! Registered for ${res.data.registeredCount} courses.`, {
        onClose: () => (window.location.href = "/my_courses"),
      });

      console.log("Registration saved:", res.data);
    } catch (err) {
      console.error("❌ Registration error:", err);
      if (err.response?.data?.message) {
        toast.error(`❌ ${err.response.data.message}`);
      } else {
        toast.error("❌ Failed to register courses. Please try again.");
      }
    }
  };

  // lecturer selection logic
  const getLecturersForCourse = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    
    if (!course || !course.instructors || !Array.isArray(course.instructors)) return [];
    
    // Return all instructors assigned to this course
    return course.instructors
      .filter(inst => inst && inst._id) // Filter out null/undefined instructors
      .map((instructor) => ({
        _id: instructor._id,
        name: `${instructor.firstName} ${instructor.lastName}`
      }));
  };


  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard_container">
          <Sidebar role="student" />
          <div className="course-registration_main">
            <div className="loading-container">
              <h2>Loading Courses...</h2>
              <p>Please wait while we fetch available courses.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="student" />

        <div className="course-registration_main">
          <h2>Course Registration</h2>

          {!hasCourses ? (
            <div className="no-courses-message">
              <FaExclamationTriangle size={48} color="#f39c12" />
              <h3>No Courses Available</h3>
              <p>There are currently no courses available for registration.</p>
              <p>Please contact your department administrator or check back later.</p>
            </div>
          ) : (
            <div className="course_info">
              <div className="left_panel">
                <form className="course_form" onSubmit={handleSubmit}>
                  <h3>Select up to 5 Courses and Lecturers</h3>
                  <p className="course-count">Available courses: {courses.length}</p>

                  {registrations.map((reg, index) => (
                    <div className="course_row" key={index}>
                      <div className="form_group">
                        <label>Course {index + 1}</label>
                        <select
                          value={reg.courseId}
                          onChange={(e) => handleChange(index, "courseId", e.target.value)}
                          disabled={!hasCourses}
                        >
                          <option value="">Select Course</option>
                          {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.code} - {course.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form_group">
                        <label>Lecturer</label>
                        <select
                          value={reg.lecturerId}
                          onChange={(e) => handleChange(index, "lecturerId", e.target.value)}
                          disabled={!reg.courseId || !hasCourses}
                        >
                          <option value="">Select Lecturer</option>
                          {getLecturersForCourse(reg.courseId).map((instructor) => (
                            <option key={instructor._id} value={instructor._id}>
                              {instructor.name}
                            </option>
                          ))}
                        </select>
                        {reg.courseId && getLecturersForCourse(reg.courseId).length === 0 && (
                          <small className="warning-text">No lecturer assigned to this course</small>
                        )}
                      </div>
                    </div>
                  ))}

                  <button 
                    className="register_btn" 
                    type="submit"
                    disabled={!hasCourses}
                  >
                    Submit Registration
                  </button>
                </form>
              </div>

              <div className="right_panel">
                <div className="student_info_display">
                  <h3>
                    <FaUserGraduate /> Student Information
                  </h3>
                  <div className="student_info_grid">
                    <div className="info_row">
                      <strong>Full Name:</strong> {currentUser?.firstName} {currentUser?.lastName}
                    </div>
                    <div className="info_row">
                      <strong>ID Number:</strong> {currentUser?.idNumber}
                    </div>
                    <div className="info_row">
                      <strong>Email:</strong> {currentUser?.email}
                    </div>
                  </div>
                </div>

                <div className="registration_summary">
                  <h3>Registration Summary</h3>
                  {registrations.filter(r => r.courseId && r.lecturerId).length === 0 ? (
                    <p className="no-selection">No courses selected yet</p>
                  ) : (
                    <ul>
                      {registrations
                        .filter(r => r.courseId && r.lecturerId)
                        .map((r, i) => {
                          const course = courses.find(c => c._id === r.courseId);
                          const instructor = course?.instructors?.find(inst => inst._id === r.lecturerId);
                          return (
                            <li key={i}>
                              <FaBook /> {course?.title} — {instructor ? `${instructor.firstName} ${instructor.lastName}` : 'No Lecturer'}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CourseRegistration;