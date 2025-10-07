import React from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();

  // Sample data for registered courses
  const courses = [
    { code: "APT301", title: "Web Application Development", lecturer: "Dr. Kamau", status: "Active", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { code: "APT305", title: "Database Systems", lecturer: "Dr. Mutua", status: "Active", img: "https://randomuser.me/api/portraits/men/56.jpg" },
    { code: "APT303", title: "Software Engineering", lecturer: "Dr. Wanjiku", status: "Active", img: "https://randomuser.me/api/portraits/women/40.jpg" },
    { code: "APT307", title: "Mobile App Development", lecturer: "Mr. Ochieng", status: "Pending", img: "https://randomuser.me/api/portraits/men/70.jpg" },
    { code: "APT309", title: "Artificial Intelligence", lecturer: "Dr. Mwangi", status: "Dropped", img: "https://randomuser.me/api/portraits/men/10.jpg" },
  ];

  const getStatusBadge = (status) => {
    const badgeStyles = {
      Active: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Dropped: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          badgeStyles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const handlenewCourse = () => {
    navigate("/course_registration");
  }

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="student" />

        <div className="mycourses_main">
          <div className="header_section">
            <h2>My Registered Courses</h2>
            <button className="new_btn" onClick={handlenewCourse}>+ Register New Courses</button>
          </div>

          <div className="courses_table modern_table">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Lecturer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <tr key={i}>
                    <td>
                      <div className="course_info">
                        <div>
                          <h4>{course.title}</h4>
                          <p>{course.code}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="lecturer_info flex items-center gap-3">
                        <img
                          src={course.img}
                          alt={course.lecturer}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{course.lecturer}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(course.status)}</td>
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

export default MyCourses;
