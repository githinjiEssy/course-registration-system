import React from "react";
import Sidebar from "../Sidebar";
import { FaBookOpen, FaUsers, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AssignedCourses() {
  const navigate = useNavigate();

  const assignedCourses = [
    {
      code: "APT301",
      title: "Web Application Development",
      students: ["John Doe", "Jane Smith", "Kevin Otieno"],
      schedule: "Mon & Wed 10:00 AM - 12:00 PM",
      status: "Ongoing",
    },
    {
      code: "APT305",
      title: "Database Systems",
      students: ["Faith Kamau", "Brian Mwangi", "Esther Wanjiru"],
      schedule: "Tue & Thu 2:00 PM - 4:00 PM",
      status: "Ongoing",
    },
    {
      code: "APT309",
      title: "Artificial Intelligence",
      students: ["Alice Wekesa", "Dennis Kiptoo"],
      schedule: "Fri 9:00 AM - 12:00 PM",
      status: "Upcoming",
    },
  ];

  const handleViewStudents = (course) => {
    navigate(`/student_list/${course.code}`, { state: { course } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="assigned_main">
          <div className="header_section">
            <h2>
              <FaBookOpen /> Assigned Courses
            </h2>
          </div>

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
                      <FaUsers className="icon" /> {course.students.length}
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
                      >
                        View Students
                      </button>
                    </td>
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

export default AssignedCourses;
