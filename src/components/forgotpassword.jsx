import React from "react";
import cheetah from "../assets/cheetahpic.jpg"
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    return (
        <>
            <div className="forgot-password-container">
                <div className="left-section">
                    <h1>Forgot password</h1>
                    <p>To reset your password, enter your e-mail address below</p>

                    <form action="" className="password-reset-form">
                        <label htmlFor="email">Enter your e-mail address</label>
                        <input type="email" id="email" placeholder="Enter your e-mail" required />

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