import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lion from "../assets/lion4.jpg"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { loginFormSchema } from "../schema";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError({username: '', password: ''})
        setLoading(true)
        try {
            await loginFormSchema.validate({username, password}, { abortEarly: false })

            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
                username,
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
                                <label>Username</label>
                                <input type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} className="form-control"
                                    />
                                    {error.username && <div className="error-message">{error.username}</div>}
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
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit" class="btn-login" disabled={loading}>
                                {loading ? <BeatLoader color="white"/>: "Sign In"}
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