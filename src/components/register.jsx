import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lion from "../assets/lion4.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { registerFormSchema } from "../schema";
import { BeatLoader} from "react-spinners"
import Footer from "./footer";


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        fullnames: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        setError({})
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError({confirmPassword: "Password do not match"})
            setLoading(false)
            return
        }

        try {
            await registerFormSchema.validate(formData, {abortEarly: false})

            const fullNamesArray = formData.fullnames.trim().split(/\s+/)
            const first_name = fullNamesArray[0] || ''
            const last_name = fullNamesArray.slice(1).join('') || ''

            const dataToSubmit = {
                username: formData.username,
                first_name: first_name,
                last_name: last_name,
                email: formData.email,
                password: formData.password
            }

            await axios.post("http://127.0.0.1:8000/api/auth/register/", dataToSubmit)

            navigate('/')

        } catch (validationErrors) {
             if (validationErrors.name === "ValidationError") {
                
                const errors = validationErrors.inner.reduce((acc, error) => {
                    acc[error.path] = error.message;
                    return acc;
                }, {});
                setError(errors);
            } else {
                setError("An error occurred during registration.");
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
        <div className="register-page">
            <div className="register-left">
                <img src={lion} alt="" className="register-image" />
            </div>
            <div className="register-right">
                <div className="register-form-container">
                    <h2 className="register-title">Join Us at MaliKale Safaris</h2>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-content">
                            <label htmlFor="username" className="register-form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your username"
                            />
                            {error.username && <div className="error-message">{error.username}</div>}
                        </div>
                        <div className="mb-3 form-content">
                            <label htmlFor="fullnames" className="register-form-label">
                                Full Names
                            </label>
                            <input
                                type="text"
                                name="fullnames"
                                value={formData.fullnames}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your full names"
                            />
                            {error.fullnames && <div className="error-message">{error.fullnames}</div>}
                        </div>
                        <div className="mb-3 form-content">
                            <label htmlFor="email" className="register-form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            {error.email && <div className="error-message">{error.email}</div>}
                        </div>
                        <div className="mb-3 form-content">
                            <label htmlFor="password" className="register-form-label">
                                Password
                            </label>
                            <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="password-input"
                                placeholder="Enter your password"
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                            </div>
                            {error.password && <div className="error-message">{error.password}</div>}
                        </div>
                        <div className="mb-3 form-content">
                            <label htmlFor="confirmPassword" className="register-form-label">
                                Confirm Password
                            </label>
                            <div className="password-container">
                            <input
                                type={showconfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="password-input"
                                placeholder="Confirm your password"
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showconfirmPassword)}>
                                {showconfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                            </div>
                            {error.confirmPassword && <div className="error-message">{error.confirmPassword}</div>}
                        </div>

                        <button type="submit" className="btn-register" disabled={loading}>
                            {loading? (
                                <BeatLoader size={20} color="white" loading={loading} />
                                ) : (
                                    "Sign Up"
                            )}
                        </button>
                        {typeof error === "string" && <div className="error-message">{error}</div>}
                    </form>
                    <div className="divider">or</div>
                    <div className="signup-link">
                        Already have an account? <Link to="/">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Register