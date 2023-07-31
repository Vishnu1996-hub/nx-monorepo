import express from 'express';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import './workers/sendEmailWorker';
import { WorkflowClient } from '@temporalio/client';
import { sendEmailWorkflow } from './workflows/sendEmailWorkflow';
// import sendEmail from './activities/sendEmail';

const app = express();
dotenv.config();

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

    if (!to || !subject || !text) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const client = new WorkflowClient();

    // Start the Temporal workflow asynchronously
    await client.execute(sendEmailWorkflow,{...req.body});
    return res.status(200).json({ message: 'Email sending initiated' });

    // const result = await sendEmail(to,subject,text);
    // if(result.error) {
    //   res.json({message: result.error});  
    // }
    // res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
