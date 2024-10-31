import React from "react";
import cheetah from "../assets/cheetahpic.jpg"
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        try { 
            const response = await fetch("http://127.0.0.1:8000/password-reset/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setMessage("Password reset link sent to your email.")
            } else {
                setMessage("Failed to send reset link. Please try again.")
            }
        } catch (error) {
            console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
        }
    }

    return (
        <>
            <div className="forgot-password-container">
                <div className="left-section">
                    <h1>Forgot password</h1>
                    <p>To reset your password, enter your e-mail address below</p>

                    <form action="" className="password-reset-form" onSubmit={handleEmailSubmit}>
                        <label htmlFor="email">Enter your e-mail address</label>
                        <input type="email" id="email" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {message && <p>{message}</p>}

                        <button type="submit" className="reset-button">Reset password <span className="arrow">→</span></button>
                    </form>

                   
                        <div className="signup-link">
                            Still remember your password? <Link to="/">Go Back to Login</Link>
                        </div>
                </div>
                <div className="right-sectiony">
                    <img
                        src={cheetah}
                        alt="Password Reset Illustration"
                        className="illustration"
                    />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword