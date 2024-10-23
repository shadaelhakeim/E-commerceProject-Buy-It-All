import React, { useState, useEffect } from 'react';
import './PaymentPage.css';  // Your custom styles
import { loadStripe } from '@stripe/stripe-js';
import Navbar from "../../components/Header/Header";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import styled from 'styled-components';  // For custom styling

const stripePromise = loadStripe('pk_test_51Q9Vk62M98qASWQqc6u7n5Br3p6QrHcc1lwFHR4Z8AdGs6vbE3QBdE55uFgTxpnLY3D6xvlgYw6A8DrlqWynFMFL00OoSAg4i0');

const PaymentPage = (userData, logout) => {
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation(); 
  const subtotal = location.state?.subtotal || 0; 

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('http://localhost:3001/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: subtotal }),
        });
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('No client secret in response:', data);
        }
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };
    fetchClientSecret();
  }, [subtotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
      },
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message,
      });
    } else if (paymentIntent.status === 'succeeded') {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: `Your payment of $${subtotal / 100} has been completed successfully!`,
      });
    }
  };

  return (
     <div className="container d-flex justify-content-center align-items-center vh-100 payment-cont">
       <Navbar/> 
     <div className="card text-white bg-dark mb-3 p-4" style={{ width: '400px' }}>
        <h2 className="card-title  text-center mb-4">Payment Details</h2>
        <p className="text-center">Amount to be paid: ${subtotal / 100}</p>
        {clientSecret ? (
          <form onSubmit={handleSubmit}>
            <CardInputWrapper>
              <label>Card Number</label>
              <CardNumberElement options={{ style: { base: inputStyle } }} />
            </CardInputWrapper>
            <CardInputWrapper>
              <label>Expiry Date</label>
              <CardExpiryElement options={{ style: { base: inputStyle } }} />
            </CardInputWrapper>
            <CardInputWrapper>
              <label>CVC</label>
              <CardCvcElement options={{ style: { base: inputStyle } }} />
            </CardInputWrapper>
            <button type="submit" className="btn btn-warning mt-3 w-100" disabled={!stripe}>
              Submit Payment
            </button>
          </form>
        ) : (
          <p className='text-center'>Loading payment information...</p>
        )}
      </div>
    </div>
  );
};

const CardInputWrapper = styled.div`
  margin-bottom: 20px;
`;

const inputStyle = {
  iconColor: '#c4f0ff',
  color: '#000',
  fontWeight: '500',
  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  fontSize: '16px',
  '::placeholder': {
    color: '#9bacc8',
  },
};

export default PaymentPage;
