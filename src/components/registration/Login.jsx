import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Loader } from "../loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userUID = userCredential.user.uid;
    
            const q = query(collection(fireDB, "users"), where("uid", "==", userUID));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                toast.error("User not found in database.");
                setLoading(false); 
                return;
            }
    
            const user = querySnapshot.docs[0].data(); 
            localStorage.setItem("users", JSON.stringify(user));
    
            toast.success("Login successful!");
            setTimeout(() => {
                navigate(user.role === "user" ? "/user-dashboard" : "/admin-dashboard");
            }, 2000);
        } catch (error) {
            toast.error("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            {loading && <Loader />}
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
                            autoComplete="email"
                            autoFocus
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
                            autoComplete="current-password"
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
                        <button 
                            type="submit" 
                            className="btn w-100 fw-bold" 
                            style={{ backgroundColor: "#67a357", color: "white" }} 
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
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
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};
