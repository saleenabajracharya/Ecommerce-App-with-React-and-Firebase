import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye,  FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../loader/Loader";
import { myContext } from '../../context/myContext';
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {
    const context = useContext(myContext);
    const {loading, setLoading } = context;
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role:"user"
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = async () => {
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        

        const isValid = await validateForm();
        if (!isValid) {
            setLoading(false);
            return;
        }
    
        try {
            debugger;
            const users = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    

            const user = {
                fullName: formData.fullName,
                email: users.user.email,
                uid: users.user.uid,
                role: formData.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
            };
    

            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
    
            toast.success("Signup Successful!", { position: "top-right", autoClose: 3000 });
    
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",

            });
            
    

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {

            toast.error(error.message, { position: "top-right", autoClose: 3000 });
        }
    
        setLoading(false);
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
             {loading && <Loader/>}
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
                    <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#67a357", color: "white" }}>
    Sign Up
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
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
            
        </div>
    );
};
