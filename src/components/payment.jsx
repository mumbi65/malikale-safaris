import React, { useState } from "react"
import lion from "../assets/lion4.jpg"
import { useLocation, useNavigate, useParams } from "react-router-dom"


const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("mpesa")
    const navigate = useNavigate()
    const location = useLocation()
    const { safariId } = useParams()

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    // const safariId = location.state?.safariId

    const handleBack = () => {
        navigate(`/safari/${safariId}`)
    }

    return (
        <div className="payment-container">
            {/* left side */}
            <div className="image-section">
                <img src={lion} alt="payment-image" className="payment-image" />
            </div>

            {/* right side */}
            <div className="form-section">
                <h1 className="brand-title"><span>MaliKale</span> Safaris</h1>
                <h2>Payment Method</h2>
                <div className="payment-options">
                    <label htmlFor="">
                        <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === "mpesa"}
                            onChange={handlePaymentChange}
                        />
                        MPesa
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={handlePaymentChange}
                        />
                        PayPal
                    </label>
                </div>
                {/* conditionally render payment fields */}
                <div className="payment-form-content">
                    {paymentMethod === "mpesa" ? (
                        <div className="mpesa-form">
                            <label htmlFor="">
                                Mpesa Phone Number:
                                <input type="text" placeholder="Enter your phone number" />
                            </label>
                            <p className="mpesa-instructions">
                                You'll receive a payment request on your phone.
                            </p>
                        </div>
                    ) : (
                        <div className="paypal-form">
                            <label htmlFor="">
                                Name on Card:
                                <input type="text" placeholder="Enter name on Card" />
                            </label>
                            <label htmlFor="">
                                Card Number:
                                <input type="text" placeholder="Card Number" />
                            </label>
                            <div className="card-details">
                                <label htmlFor="">
                                    Expiration:
                                    <input type="text" placeholder="MM/YY" />
                                </label>
                                <label htmlFor="">
                                    CVV Code:
                                    <input type="text" placeholder="CVV" />
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="payment-buttons">
                    <button className="back-btn" onClick={handleBack}>Back</button>
                    <button className="confirm-btn">Confirm Payment: Ksh 80,000</button>
                </div>
            </div>
        </div>
    )
}

export default Payment