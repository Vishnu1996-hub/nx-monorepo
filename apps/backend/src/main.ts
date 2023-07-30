import express from 'express';
import * as path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const mailService = process.env.MAIL_SERVICE || '';
const mailUser = process.env.MAIL_USER || '';
const mailPass = process.env.MAIL_PASS || '';

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: mailService,
  auth: {user: mailUser,pass: mailPass}
});

// Express.js middleware setup
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

// API endpoint to send an email
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      from: 'vishnu28496@gmail.com',
      to,
      subject,
      text
    };

    if(!mailService || !mailUser || !mailPass){
      res.json({ message: 'Something is wrong from email environment!' });
    }
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the email.', 'msg': error });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
