import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q9Vk62M98qASWQqc6u7n5Br3p6QrHcc1lwFHR4Z8AdGs6vbE3QBdE55uFgTxpnLY3D6xvlgYw6A8DrlqWynFMFL00OoSAg4i0'); // Replace with your public Stripe key

const ProductComponent = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => 
  {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    // Fetch the client secret from your server
    const response = await fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 3000 }), // Amount in cents (e.g., $20.00)
    });
    const { clientSecret } = await response.json();
  
    const { error, paymentMethod } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  
    if (error)
     {
      console.error('Error confirming payment:', error);
    } else {
      console.log('Payment successful:', paymentMethod);
    }
  };
  

  return (
    <div>
      <h2>Product Title</h2>
      <p>Product Description</p>
      <p>Price: $XX.XX</p>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default ProductComponent;
