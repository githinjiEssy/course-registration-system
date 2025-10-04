import React from "react";
import AuthLayout from "./AuthLayout";

function LoginForm() {
  return (
    <AuthLayout
      title="Welcome Back!"
      description="Log in to access your course registration portal and manage your academic journey."
    >
      <h1 className="right_title">Login to Your Account</h1>

      <form className="login_form">
        <div className="input_group">
          <input type="email" className="input_field" placeholder=""required />
          <label>Email Address</label>
        </div>

        <div className="input_group">
          <input type="password" className="input_field" placeholder="" required />
          <label>Password</label>
        </div>

        <button type="submit" id="btn">Login</button>
      </form>

      <p>Don’t have an account? <a href="/">Register</a></p>
    </AuthLayout>
  );
}

export default LoginForm;
