import React from 'react'
import AuthLayout from './AuthLayout'

function RegisterForm() {
  return (
    <AuthLayout
        title="USIU Course Registration Portal"
        description="Register for APT courses, choose lecturers, and view your personalized course summary."
    >
        <h1 className='register-right_title'>Create an Account</h1>

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

            <button type="submit" className="register_btn" id='btn'>Register</button>
        </form>
        
        <div>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </AuthLayout>
  )
}

export default RegisterForm
