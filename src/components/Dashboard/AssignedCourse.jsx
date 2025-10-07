import React from "react";
import Sidebar from "../Sidebar";
import { FaBookOpen, FaUsers, FaClock } from "react-icons/fa";

function AssignedCourses() {
  const assignedCourses = [
    {
      code: "APT301",
      title: "Web Application Development",
      students: 42,
      schedule: "Mon & Wed 10:00 AM - 12:00 PM",
      status: "Ongoing",
    },
    {
      code: "APT305",
      title: "Database Systems",
      students: 38,
      schedule: "Tue & Thu 2:00 PM - 4:00 PM",
      status: "Ongoing",
    },
    {
      code: "APT309",
      title: "Artificial Intelligence",
      students: 20,
      schedule: "Fri 9:00 AM - 12:00 PM",
      status: "Upcoming",
    },
  ];

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
                </tr>
              </thead>
              <tbody>
                {assignedCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>
                      <FaUsers className="icon" /> {course.students}
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
