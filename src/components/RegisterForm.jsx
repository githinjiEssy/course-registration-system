import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Handle form submission logic here
        if (firstName && lastName && idNumber && email && password) {
            toast.success("Registration Successful", {
                position: "top-center",
                autoClose: 2000,
                onClose: () => navigate("/login")
            });

            // Reset form fields
            setFirstName('');
            setLastName('');
            setIdNumber('');
            setEmail('');
            setPassword('');
        } else {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 2000
            });
        }
        
        console.log({ firstName, lastName, idNumber, email, password });
    };

    return (
        <AuthLayout
            title="USIU Course Registration Portal"
            description="Register for APT courses, choose lecturers, and view your personalized course summary."
        >
            <h1 className='register-right_title'>Create an Account</h1>

            <form className="registration_form" onSubmit={handleSubmit}>
                <div className="input_group">
                    <input 
                        type="text" 
                        className="input_field" 
                        placeholder="" 
                        required 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>First Name</label>
                </div>

                <div className="input_group">
                    <input 
                        type="text" 
                        className="input_field" 
                        placeholder="" 
                        required 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Last Name</label>
                </div>

                <div className="input_group">
                    <input 
                        type="text" 
                        className="input_field" 
                        placeholder="" 
                        required 
                        value={idNumber} 
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <label>ID Number</label>
                </div>

                <div className="input_group">
                    <input 
                        type="email" 
                        className="input_field" 
                        placeholder="" 
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
                        placeholder="" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>

                <button type="submit" className="register_btn" id='btn'>
                    Register
                </button>
            </form>
            
            <div>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>

            <ToastContainer />
        </AuthLayout>
    );
}

export default RegisterForm;