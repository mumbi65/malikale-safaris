import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalButton = React.memo(({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider 
            options={{ 
                "client-id": "AfO4rYQ6HqRQx0cbet9VfliDVt3qv2SFOss_tKOpOhJ0vkqntTtYVkyV_eSn62aq9wEBFCuAyWOHqoGu",
                currency: "USD"
            }}
        >
            <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: { value: amount.toFixed(2) },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    console.log('Payment Successful:', details);

                    const buyerFirstName = details.payer?.name?.given_name || 'Unknown';
                    const buyerLastName = details.payer?.name?.surname || 'Unknown';
                    const payerID = details.payer?.payer_id || 'Unknown'

                    const paymentData = {
                        orderID: details.id,
                        payerID: payerID,
                        amount: details.purchase_units[0].amount.value,
                        currency: details.purchase_units[0].amount.currency_code,
                        status: details.status,
                        buyerFirstName: buyerFirstName,
                        buyerLastName: buyerLastName,
                    }
                    console.log(paymentData)

                    fetch("http://127.0.0.1:8000/safari/save-paypal-payment/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paymentData),
                    })
                    .then(response => response.json())
                    .then(data => console.log('Payment saved:', data))
                    .catch(error => console.error('Error saving payment:', error))

                    alert(`Transaction completed by ${details.payer.name.given_name}`)
                }}
                onError={(err) => {
                    console.error('PayPal Checkout Error:', err);
                    alert('An error occurred. Please try again.');
                }}
            />
        </PayPalScriptProvider>
    );
});

export default PaypalButton;
