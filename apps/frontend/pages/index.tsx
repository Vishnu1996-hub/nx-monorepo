import { useState } from 'react';
import styles from './index.module.css';
import Form from '../components/Form';
import dotenv from 'dotenv';
dotenv.config();

const apiPort = process.env.PORT || 3333;

export function Index() {
  const [resp,setResp] = useState<any>([]);

  const handleSubmit = (email: string) => {
    const url = `http://localhost:${apiPort}/api/send-email`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "subject": "Email sending functionality test",
        "text": "Hey! brother, how are you?",
        "to": email
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((data) => data.json()).then(setResp).catch((error) => console.log(error));
  };

  return (
    <div className={styles.page}>
        <div className="container">
            <h1>🙏You Are Welcome🙏</h1>
            <Form onSubmit={handleSubmit} />
            <p>{resp.message}</p>
          </div>
    </div>
  );
}

export default Index;
