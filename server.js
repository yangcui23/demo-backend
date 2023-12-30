const express = require('express');
const stripe = require('stripe')('sk_test_51N1mK1HxWG3skUBnvQQKWoVWoWzZl7w3yUxMwmBJKnbcN06cABvxVzD4cDwLRvboHkLRS6pxi7Ek81PLpxxhR0mG0082WBG0V0');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

// Route for creating payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount, // amount in cents
          currency: 'usd',
          // additional parameters
      });

      res.send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

