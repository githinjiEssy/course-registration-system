import React, { useState } from "react";
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
    role: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate role selection
    if (!formData.role) {
      toast.error("⚠️ Please select your role.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Debug: Check if usersData is loaded correctly
    console.log("usersData:", usersData);
    console.log("Selected role:", formData.role);

    // Safely get users based on selected role
    let userGroup;
    if (formData.role === "student") {
      userGroup = usersData?.students || [];
    } else if (formData.role === "instructor") {
      userGroup = usersData?.lecturers || []; // Make sure this matches your JSON
    } else {
      toast.error("⚠️ Invalid role selected.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Check if userGroup is valid
    if (!Array.isArray(userGroup) || userGroup.length === 0) {
      toast.error("⚠️ No users found for this role.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const foundUser = userGroup.find(
      (user) => user.email === formData.email && user.password === formData.password 
    );

    if (!foundUser) {
      toast.error("⚠️ Invalid email or password.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    localStorage.setItem("user", JSON.stringify(foundUser));
    toast.success(`Welcome ${foundUser.firstName}`, {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      if (foundUser.role === "student") {
        navigate("/student");
      } else if (foundUser.role === "instructor") {
        navigate("/instructor");
      }
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

        {/* Role Dropdown */}
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
            <option value="instructor">Lecturer</option>
          </select>
          <label>User Role</label>
        </div>

        <button type="submit" id="btn">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/">Register</a>
      </p>

      <ToastContainer />
    </AuthLayout>
  );
}

export default LoginForm;