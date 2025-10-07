import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // 👈 added role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚙️ Replace this logic with real backend validation later
    if (email && password && role) {
      // Example role-based check
      if (role === "student") {
        toast.success("🎓 Student login successful!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/student"), // ✅ redirect to student dashboard
        });
      } else if (role === "instructor") {
        toast.success("👨‍🏫 Instructor login successful!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/instructor"), // ✅ redirect to instructor dashboard
        });
      }
    } else {
      toast.error("⚠️ Please enter all fields correctly.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
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
            className="input_field"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>

        <div className="input_group">
          <input
            type="password"
            className="input_field"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        {/* 👇 Added Role Dropdown */}
        <div className="input_group">
          <select
            className="input_field"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <label>User Role</label>
        </div>

        <button type="submit" id="btn">Login</button>
      </form>

      <p>
        Don’t have an account? <a href="/">Register</a>
      </p>

      <ToastContainer />
    </AuthLayout>
  );
}

export default LoginForm;
