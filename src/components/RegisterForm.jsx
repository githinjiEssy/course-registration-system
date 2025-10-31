import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.idNumber || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!formData.email.endsWith("@usiu.ac.ke")) {
            toast.error("Please use your USIU email address (@usiu.ac.ke)");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/students/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
            toast.success("Registration successful!", {
                autoClose: 1500,
                onClose: () => navigate("/login"),
            });
            setFormData({
                firstName: "",
                lastName: "",
                idNumber: "",
                email: "",
                password: "",
            });
            } else {
            toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error("Server error. Please try again later.");
        }
    };


    return (
        <AuthLayout
            title="USIU Course Registration Portal"
            description="Register for APT courses, choose lecturers, and view your personalized course summary."
        >
            <h1 className="register-right_title">Create Student Account</h1>

            <form className="registration_form" onSubmit={handleSubmit}>
                <div className="input_group">
                    <input
                        type="text"
                        name="firstName"
                        className="input_field"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label>First Name</label>
                </div>

                <div className="input_group">
                    <input
                        type="text"
                        name="lastName"
                        className="input_field"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label>Last Name</label>
                </div>

                <div className="input_group">
                    <input
                        type="text"
                        name="idNumber"
                        className="input_field"
                        required
                        value={formData.idNumber}
                        onChange={handleChange}
                    />
                    <label>ID Number</label>
                </div>

                <div className="input_group">
                    <input
                        type="email"
                        name="email"
                        className="input_field"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label>USIU Email Address</label>
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

                <button type="submit" className="register_btn" id="btn">
                    Register as Student
                </button>
            </form>

            <div>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                    Lecturers: Please use your predefined admin accounts
                </p>
            </div>

            <ToastContainer />
        </AuthLayout>
    );
}

export default RegisterForm;