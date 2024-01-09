require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51OU24BKcfxYg7Jb74z1Q4Eb5cCZf1IyY80R7BbGX8ZsSvGvBbdwo44r7szboTU7zWL4xdmtLzyTdsqH8fbahDlSV00PdEBss4X"
);

// router endpoints
router.post("/intents", async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
