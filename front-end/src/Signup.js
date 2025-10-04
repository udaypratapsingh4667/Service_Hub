import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft, User, Mail, Lock, Briefcase, Users, GitMerge, Globe } from 'lucide-react';
import './Signup.css'; // Import the new CSS file

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) {
            toast.error("Please select your role.", { position: "bottom-center" });
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                name,
                email,
                password,
                role,
            });
            toast.success(res.data.message, { position: "bottom-center" });
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed. Please try again.", {
                position: "bottom-center",
            });
        }
    };

    return (
        <>
            <div className="signup-container">
                
                {/* --- Form Panel (Left) --- */}
                <div className="form-panel">
                    <div className="form-content">
                        <Link to="/" className="back-to-home">
                            <ArrowLeft size={18} />
                            <span>Back to Home</span>
                        </Link>

                        <div className="form-header">
                            <h2>Create an Account</h2>
                            <p>Join our community to discover and offer services.</p>
                        </div>

                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Full Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="role-selector">
                                <div className="role-label">Choose your role</div>
                                <div className="role-buttons">
                                    <button
                                        type="button"
                                        className={`role-btn ${role === "Service Provider" ? "active-role" : ""}`}
                                        onClick={() => setRole("Service Provider")}
                                    >
                                        <Briefcase size={16} />
                                        Provider
                                    </button>
                                    <button
                                        type="button"
                                        className={`role-btn ${role === "Customer" ? "active-role" : ""}`}
                                        onClick={() => setRole("Customer")}
                                    >
                                        <Users size={16} />
                                        Customer
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn">Create Account</button>
                        </form>

                        <div className="divider">OR</div>
                        
                        <div className="social-logins">
                            <button className="social-btn">
                                <Globe size={18} />
                                Continue with Google
                            </button>
                            <button className="social-btn">
                                <GitMerge size={18} />
                                Continue with GitHub
                            </button>
                        </div>
                        
                        <p className="switch-text">
                            Already have an account? <Link to="/login">Log In</Link>
                        </p>
                    </div>
                </div>

                {/* --- Branding Panel (Right) --- */}
                <div className="branding-panel">
                    <div className="branding-content">
                        <h1>Welcome to ServiceHub</h1>
                        <p>The one-stop platform that connects you with the best service providers in your area.</p>
                    </div>
                </div>
                
            </div>
            <ToastContainer theme="dark" />
        </>
    );
};

export default Signup;
