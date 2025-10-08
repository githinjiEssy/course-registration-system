import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usersData from "../data/users.json";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // ✅ Auto redirect if user is already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      navigate(loggedInUser.role === "student" ? "/student" : "/instructor");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("⚠️ Please select your role.", { position: "top-center" });
      return;
    }

    let foundUser = null;

    if (formData.role === "student") {
      // ✅ Check students from localStorage
      const students = JSON.parse(localStorage.getItem("students")) || [];
      foundUser = students.find(
        (student) =>
          student.email.toLowerCase() === formData.email.toLowerCase() &&
          student.password === formData.password
      );
    } else {
      // ✅ Check lecturers from JSON file
      foundUser = usersData.lecturers.find(
        (lecturer) =>
          lecturer.email.toLowerCase() === formData.email.toLowerCase() &&
          lecturer.password === formData.password
      );
    }

    if (!foundUser) {
      toast.error("⚠️ Invalid email or password.", { position: "top-center" });
      return;
    }

    // ✅ Save logged in user
    localStorage.setItem("user", JSON.stringify(foundUser));

    toast.success(`Welcome ${foundUser.firstName}!`, {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate(foundUser.role === "student" ? "/student" : "/instructor");
    }, 2000);
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Log in to access your course registration portal and manage your academic journey."
    >
      <h1 className="right_title">Login to Your Account</h1>

      <form className="login_form" onSubmit={handleLogin}>
        <div className="input_group">
          <input
            type="email"
            name="email"
            className="input_field"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label>Email Address</label>
        </div>

        <div className="input_group">
          <input
            type="password"
            name="password"
            className="input_field"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>

        <div className="input_group">
          <select
            name="role"
            className="input_field"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Lecturer/Admin</option>
          </select>
          <label>User Role</label>
        </div>

        <button type="submit" id="btn">
          Login
        </button>
      </form>

      <p>
        Student? <a href="/">Create Account</a>
      </p>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
        Lecturers: Use your predefined admin credentials
      </p>

      <ToastContainer />
    </AuthLayout>
  );
}

export default LoginForm;