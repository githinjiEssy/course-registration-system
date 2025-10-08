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

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Basic validation
        if (!formData.firstName || !formData.lastName || !formData.idNumber || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        // ✅ Validate USIU email
        if (!formData.email.endsWith('@usiu.ac.ke')) {
            toast.error("Please use your USIU email address (@usiu.ac.ke)");
            return;
        }

        // ✅ Get existing students from localStorage
        const students = JSON.parse(localStorage.getItem("students")) || [];

        // ✅ Check duplicate email
        if (students.some((student) => student.email === formData.email)) {
            toast.error("Email already registered");
            return;
        }

        // ✅ Check duplicate ID number
        if (students.some((student) => student.idNumber === formData.idNumber)) {
            toast.error("ID Number already registered");
            return;
        }

        // ✅ Save new student to localStorage
        const newStudent = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            idNumber: formData.idNumber,
            email: formData.email,
            password: formData.password,
            role: "student",
        };

        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));

        toast.success("Registration Successful!", {
            autoClose: 1500,
            onClose: () => navigate("/login"),
        });

        // Reset form
        setFormData({
            firstName: "",
            lastName: "",
            idNumber: "",
            email: "",
            password: "",
        });
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