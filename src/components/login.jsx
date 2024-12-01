import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lion from "../assets/lion4.jpg"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { loginFormSchema } from "../schema";
import Footer from "./footer";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError({ identifier: '', password: '' })
        setLoading(true)
        try {
            await loginFormSchema.validate({ identifier, password }, { abortEarly: false })

            const response = await axios.post("https://malikale-safaris.onrender.com/api/auth/login/", {
                username: identifier,
                password,
            })
            localStorage.setItem("token", response.data.token)
            navigate("/home")
        } catch (error) {
            if (error.name === "ValidationError") {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setError(newErrors);
            } else {
                setError("Invalid credentials");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="login-left">
                    <img src={lion} alt="" className="login-image" />
                </div>
                <div className="login-right">
                    <div className="login-form-container">
                        <h1 className="brand-title"><span>MaliKale</span> Safaris</h1>
                        <h3>Welcome to MaliKale Safaris</h3>
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label>Username or Email</label>
                                <input type="text"
                                    placeholder="Username or Email"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)} className="form-control"
                                />
                                {error.identifier && <div className="error-message">{error.identifier}</div>}
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="password" class="form-label">Password</label>
                                <div className="password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="password-input"
                                    />
                                    <span
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                    </span>
                                    {error.password && <div className="error-message">{error.password}</div>}
                                </div>
                            </div>
                            <div className="forgot-password">
                                <Link to="/forgotPassword">Forgot Password?</Link>
                            </div>
                            <button type="submit" class="btn-login" disabled={loading}>
                                {loading ? <BeatLoader color="white" /> : "Sign In"}
                            </button>
                            {typeof error === "string" && <div className="error-message">{error}</div>}
                        </form>
                        <div className="divider">or</div>
                        <div className="signup-link">
                            New to MaliKale Safaris? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login