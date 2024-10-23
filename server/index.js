const express = require('express');
const stripe = require('stripe')('sk_test_51Q9Vk62M98qASWQqjxAyshci4UXPIsvn9wN0mLXTd6CVLHLs5kbRms2w4a4n4jt02CnmCPjmkA5feSl1oIsgqZjK00ba00Vczz'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Port for the server
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if cookies/auth data are needed
}));
app.use(bodyParser.json()); // Parse JSON bodies

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Get the amount from the client
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
