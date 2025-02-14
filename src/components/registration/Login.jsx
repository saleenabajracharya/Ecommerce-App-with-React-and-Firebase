import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye,  FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Signup Successful!", { position: "top-right", autoClose: 3000 });
            setTimeout(() => {
                navigate("/"); 
            }, 1000);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="login_Form px-3 px-lg-4 py-5 border border-success-subtle rounded shadow-sm">
                <div className="mb-4">
                    <h2 className="text-center fs-4 fw-bold" style={{ color: "#67a357" }}>
                        Login
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>

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

 
                    <div className="mb-4">
                        <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#67a357", color: "white" }}><Link className="text-decoration-none fw-bold" style={{ color: "#fff" }} to={"/"}>
                            Login
                            </Link>
                        </button>
                    </div>
                </form>


                <div>
                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link className="text-decoration-none fw-bold" style={{ color: "#67a357" }} to={"/signup"}>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
