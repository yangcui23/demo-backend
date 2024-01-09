const express = require("express");
const paymentRoutes = require("./router/paymentRoutes");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = 3000;

app.use(bodyParser.json());
app.use("/payments", paymentRoutes);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yangcui4@gmail.com",
    pass: "dskjoevuhrodejtg",
  },
});

// Endpoint to receive payment details and send email
app.post("/paymentDetails", async (req, res) => {
  const { venueName, userName, price, date, userEmail, image, location } =
    req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "yangcui4@gmail.com", // Destination email
    subject: "New Payment Received",
    text: `Payment Details:\nVenue: ${venueName}\nLocation: ${location}\nUser: ${userName}\nPrice: $${price}\nDate: ${date}\nUser Email: ${userEmail}\nImageUrl :${image}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
