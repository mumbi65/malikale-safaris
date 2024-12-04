import React, { useState, useCallback, useRef, useEffect } from "react"
import lion from "../assets/lion4.jpg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import PaypalButton from "./paypalButton"


const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("mpesa")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [safari, setSafari] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [transaction_id, setTransactionId] = useState("")
    const [checkout_request_id, setCheckoutRequestId] = useState(null)
    const [isPolling, setIsPolling] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate()
    const { safariId } = useParams()
   


    useEffect(() => {
        let isMounted = true
        fetch(`https://malikale-safaris.onrender.com/safari/api/safari/${safariId}/`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setSafari(data)
                    setAmount(parseInt(data.price, 10))
                }
            })
            .catch((error) => console.error("Error fetching safari:", error))

        return () => (isMounted = false)
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
        setLoading(true);
        setIsPolling(false)
        
        try {
            const stkResponse = await fetch("https://malikale-safaris.onrender.com/safari/daraja/stk_push/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    amount: parseInt(amount, 10),
                    name,
                    safari_package_id: safariId,
                }),
            });

            const stkData = await stkResponse.json();
            console.log("STK Push Response:", stkData);
            console.log("Response Code:", stkData.ResponseCode)


            if (stkResponse.ok && stkData.ResponseCode === "0") {
                alert("Payment request sent. Check your phone.");
                const checkoutRequestId = stkData.CheckoutRequestID
                setCheckoutRequestId(checkoutRequestId)

                const pollingTimeout = setTimeout(() => {
                    console.log("Starting polling after delay...")
                    pollPaymentStatus(checkoutRequestId)
                }, 30000)

                return () => clearTimeout(pollingTimeout)
            } else {
                const errorMessage = stkData?.CustomerMessage || "Failed to initiate payment";
                console.error("Unexpected response:", stkData);
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed. Please try again");
        } finally {
            setLoading(false);
        }
    };


    const pollPaymentStatus = async (checkoutRequestId) => {

            if(!checkoutRequestId) {
                console.error("No checkout request ID provided")
                return
            }

            if (isPolling) return
            setIsPolling(true)

            const startTime = Date.now()
            const max_polling_time = 60000
            const poll_interval = 5000

            const interval = setInterval(async () => {
                const elapsedTime = Date.now() - startTime

                if (elapsedTime >= max_polling_time) {
                    clearInterval(interval)
                    alert("Payment verification timed out.")
                    setIsPolling(false)
                    return
                }

                try {
                    const response = await fetch(`https://malikale-safaris.onrender.com/safari/payment-status/${checkoutRequestId}/`);
                    const data = await response.json();
                    
                    if(response.ok && (data.status === 'success' || data.transaction_id)) {
                        alert(data.message || "Payment saved successfully.")
                        clearInterval(interval)
                        setIsPolling(false)
                    } else if (response.status === 404){
                        console.log(`Payment not found. Retrying...(${elapsedTime/1000} seconds elapsed)`)
                    } else {
                        clearInterval(interval)
                        alert(data.error || "Failed to save payment")
                        setIsPolling(false)
                    }
                    
                } catch (error) {
                    clearInterval(interval)
                    console.error("Save payment error:", error);
                    alert("Network error. Please check your connection.")
                    setIsPolling(false)
                }
            }, poll_interval)
    }


    const handlePaymentSuccess = useCallback((details) => {
        console.log('Payment Successful:', details)
        alert('Payment completed successfully!')
    }, [])

    const handleBack = () => {
        navigate(`/safari/${safariId}`)
    }


    return (
        <div className="payment-page-container">
            {/* Notification section */}
            {notification && <div className="notification">{notification}</div>}

            {/* left side */}
            <div className="image-section">
                <img src={lion} alt="payment-image" className="payment-image" />
            </div>

            {/* right side */}
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
                                {/* <label htmlFor="">
                                    Your Email:
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </label> */}
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