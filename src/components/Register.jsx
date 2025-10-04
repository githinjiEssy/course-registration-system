import React from "react";

function Register() {
    return (
        <div className="register">
            <div className="register_container">
                <div className="register_left">
                    <h1 className="left_title">USIU Course Registration Portal</h1>
                    <p className="left_desc">
                        Register, select lecturers, and stay on track with your academic progress, anywhere, anytime.
                    </p>
                </div>

                <div className="register_right">
                    <h1 className="right_title">Create an Account</h1>

                    <form action="" className="registration_form">
                        <div className="input_group">
                            <input type="text" className="input_field" placeholder="" required/>
                            <label htmlFor="">First Name</label>
                        </div>

                        <div className="input_group">
                            <input type="text" className="input_field" placeholder="" required/>
                            <label htmlFor="">Last Name</label>
                        </div>

                        <div className="input_group">
                            <input type="text" className="input_field" placeholder="" required/>
                            <label htmlFor="">ID Number</label>
                        </div>

                        <div className="input_group">
                            <input type="email" className="input_field" placeholder="" required/>
                            <label htmlFor="">Email Address</label>
                        </div>

                        <div className="input_group">
                            <input type="password" className="input_field" placeholder="" required/>
                            <label htmlFor="">Password</label>
                        </div>

                        <button type="submit" className="register_btn">Register</button>
                    </form>

                    <div>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;