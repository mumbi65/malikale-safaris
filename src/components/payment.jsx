import React, { useState, useCallback, useRef } from "react"
import lion from "../assets/lion4.jpg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { BeatLoader } from "react-spinners"
import PaypalButton from "./paypalButton"


const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("mpesa")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [safari, setSafari] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [isPolling, setIsPolling] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { safariId } = useParams()
    

    useEffect(() => {
        let isMounted = true
        fetch(`http://127.0.0.1:8000/safari/api/safari/${safariId}/`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setSafari(data)

                    const newAmount = parseInt(data.price, 10)
                    if (newAmount !== amount) {
                        setAmount(newAmount)
                    }
                }
            })
            .catch((error) => console.error("Error fetching safari:", error))

            return () => {
                isMounted = false
            }
    }, [safariId])

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePayment = async () => {
        setLoading(true)
        try {
            const saveResponse = await fetch("http://127.0.0.1:8000/safari/save-payment/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    safari_name: safari.title,
                    name,
                    email,
                    phone_number: phoneNumber,
                    amount: parseInt(amount, 10),
                })
            })
            if (!saveResponse.ok) {
                const saveError = await saveResponse.json()
                alert(`Error: ${saveError.error || "Failed to save payment details"}`)
                return
            }

            const stkResponse = await fetch("http://127.0.0.1:8000/safari/daraja/stk_push/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    amount: parseInt(amount, 10),
                    name,
                    email,
                }),
            })

            const stkData = await stkResponse.json()
            if (stkResponse.ok) {
                alert("Payment request sent. Check your phone.")
            } else {
                alert(`Error: ${stkData.error || "Failed to send payment request"}`)
            }
        } catch (error) {
            console.error("Payment error:", error)
            alert("Payment failed. Please try again")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let interval;
        if (isPolling) {
            interval = setInterval(async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/safari/payment-status/${transactionId}/`)
                    const data = await response.json()
                    if (data.transaction_id) {
                        setIsPolling(false)
                        alert("Payment completed successfully!")
                    }
                } catch (error) {
                    console.error("Polling error:", error)
                }
            }, 5000)
        }
        return () => clearInterval(interval)
    }, [isPolling, transactionId, safariId])

    const handlePaymentSuccess = useCallback((details) => {
        console.log('Payment Successful:', details)
        alert('Payment completed successfully!')
    }, [])

    const handleBack = () => {
        navigate(`/safari/${safariId}`)
    }

    console.log("Payment component rendered")

    return (
        <div className="payment-page-container">
            {/* left side */}
            <div className="image-section">
                <img src={lion} alt="payment-image" className="payment-image" />
            </div>

            {/* right side */}
            {/* <div className="form-section"> */}
            <div className="payment-form-wrapper">
                <div className="payment-form-container">
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
                                    Your Name:
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </label>
                                <label htmlFor="">
                                    Your Email:
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </label>
                                <label htmlFor="">
                                    Mpesa Phone Number:
                                    <input type="text" placeholder="254712345678" value={phoneNumber} onChange={handlePhoneNumberChange} />
                                </label>
                                <p className="mpesa-instructions">
                                    You'll receive a payment request on your phone.
                                </p>
                                <div className="payment-buttons">
                                    <button className="back-btn" onClick={handleBack}>Back</button>
                                    <button className="confirm-btn" onClick={handlePayment} disabled={loading}>
                                        {loading ? <BeatLoader color="white" /> : `Confirm Payment: Ksh ${amount}`}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="paypal-form">
                                <label htmlFor="">
                                    Amount to Pay:
                                     <input type="number" value={amount} readOnly />
                                </label>
                                {amount > 0 && <PaypalButton amount={amount} onSuccess={handlePaymentSuccess} />}
                                <div className="payment-buttons">
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment