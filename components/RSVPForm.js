// frontend/src/RSVPForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RSVPForm = () => {
  const [familyName, setFamilyName] = useState('');
  const [attendees, setAttendees] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!familyName || !attendees) {
      alert('Please fill out both fields.');
      return;
    }
    try {
      await axios.post('/api/rsvp', { familyName, attendees: parseInt(attendees, 10) });
      setFamilyName('');
      setAttendees('');
      alert('RSVP submitted successfully!');
    } catch (error) {
      alert('Failed to submit RSVP');
      console.error('RSVP submission error:', error);
    }
  };

  return (
    <div>
      <h2>RSVP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          required
        />
        <input
          type="number"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          placeholder="Number of Attendees"
          required
        />
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
};

export default RSVPForm;
