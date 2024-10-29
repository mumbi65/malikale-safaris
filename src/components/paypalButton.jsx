import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalButton = React.memo(({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider 
            options={{ "client-id": "AfO4rYQ6HqRQx0cbet9VfliDVt3qv2SFOss_tKOpOhJ0vkqntTtYVkyV_eSn62aq9wEBFCuAyWOHqoGu" }}
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
                    onSuccess(details);
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
