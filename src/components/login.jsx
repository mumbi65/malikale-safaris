import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import animals from "../assets/animals.jpg"
import lion from "../assets/lion4.jpg"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login/", {
                username,
                password,
            })
            localStorage.setItem("token", response.data.token)
            navigate("/profile")
        } catch (error) {
            setError("Invalid credentials")
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
                        <h1 className="brand-title">MaliKale Safaris</h1>
                        <h3>Welcome to MaliKale Safaris</h3>
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} className="form-control"/>
                            </div>
                            <div className="mb-3 form-group password-group">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </span>
                            </div>
                            <div className="forgot-password">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit" class="btn-login">Sign In</button>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                        <div className="divider">or</div>
                        <div className="signup-link">
                            New to MaliKale Safaris? <a href="/signup">Create an account</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login