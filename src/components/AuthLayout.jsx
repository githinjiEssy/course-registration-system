import React from "react";

function AuthLayout({ title, description, children }) {
  return (
    <div className="authentication">
      <div className="auth_container">
        {/* Left side with background image */}
        <div className="auth_left">
          <h1 className="left_title">{title}</h1>
          <p className="left_desc">{description}</p>
        </div>

        {/* Right side for form */}
        <div className="auth_right">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
