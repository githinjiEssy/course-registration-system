import React from "react";
import Sidebar from "../Sidebar";
import { FaListUl } from "react-icons/fa";

function AssignedCourses() {
  const assignedCourses = [
    { id: 1, name: "Database Systems", code: "APT301", students: 18 },
    { id: 2, name: "Web Application Development", code: "APT302", students: 20 },
    { id: 3, name: "Mobile App Development", code: "APT304", students: 15 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <Sidebar role="instructor" />

        <div className="main_content">
          <h2><FaListUl /> Assigned Courses</h2>

          <table className="course_table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Enrolled Students</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.students}</td>
                  <td>
                    <button className="view_btn">View Students</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignedCourses;
