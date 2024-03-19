import React, { useState } from 'react';
import styles from '../styles.module.css';
import '../global.css'

const RSVPForm = () => {
  const [familyName, setFamilyName] = useState('');
  const [peopleCount, setPeopleCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!familyName || !peopleCount) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: familyName, pplCount: parseInt(peopleCount, 10) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert(`RSVP confirmed for ${result.name}!`);
      setFamilyName('');
      setPeopleCount('');
    } catch (error) {
      alert('Failed to submit RSVP');
      console.error('RSVP submission error:', error);
    }
  };

  return (
    <div className={styles.rsvpFormContainer}>
      
      <h2>RSVP for Our Wedding</h2>
      <div className=''>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.rsvpInput}
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          required
        />
        <input
          className={styles.rsvpInput}
          type="number"
          value={peopleCount}
          onChange={(e) => setPeopleCount(e.target.value)}
          placeholder="Number of People"
          required
        />
        <button className={styles.rsvpSubmit} type="submit">Submit RSVP</button>
      </form>
      </div>
    </div>
  );
};

export default RSVPForm;