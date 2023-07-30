import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './Form.module.css'; // Make sure to import the CSS file

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const Form: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
      <form id={styles.container} className={styles['email-form']} onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
  );
};

export default Form;