import React, {useState} from 'react'
import AuthLayout from './AuthLayout'

function RegisterForm() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [idNumber, setIdNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ firstName, lastName, idNumber, email, password });
    }


  return (
    <AuthLayout
        title="USIU Course Registration Portal"
        description="Register for APT courses, choose lecturers, and view your personalized course summary."
    >
        <h1 className='register-right_title'>Create an Account</h1>

        <form action="" className="registration_form" onSubmit={handleSubmit}>
            <div className="input_group">
                <input type="text" className="input_field" placeholder="" required value={firstName}/>
                <label htmlFor="">First Name</label>
            </div>

            <div className="input_group">
                <input type="text" className="input_field" placeholder="" required value={lastName}/>
                <label htmlFor="">Last Name</label>
            </div>

            <div className="input_group">
                <input type="text" className="input_field" placeholder="" required value={idNumber}/>
                <label htmlFor="">ID Number</label>
            </div>

            <div className="input_group">
                <input type="email" className="input_field" placeholder="" required value={email}/>
                <label htmlFor="">Email Address</label>
            </div>

            <div className="input_group">
                <input type="password" className="input_field" placeholder="" required value={password}/>
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
