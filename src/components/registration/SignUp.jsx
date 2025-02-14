import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye,  FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character";
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Signup Successful!", { position: "top-right", autoClose: 3000 });
            setTimeout(() => {
                navigate("/login"); 
            }, 1000);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="login_Form px-3 px-lg-4 py-5 border border-success-subtle rounded shadow-sm">
                <div className="mb-4">
                    <h2 className="text-center fs-4 fw-bold" style={{ color: "#67a357" }}>
                        Sign Up
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3 position-relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-4 position-relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    {/* Signup Button */}
                    <div className="mb-4">
                        <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#67a357", color: "white" }}><Link className="text-decoration-none fw-bold" style={{ color: "#fff" }} to={"/login"}>
                            Sign Up
                            </Link>
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <div>
                    <p className="text-center">
                        Have an account?{" "}
                        <Link className="text-decoration-none fw-bold" style={{ color: "#67a357" }} to={"/login"}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
