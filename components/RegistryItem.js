// frontend/src/RegistryItem.js
import React, { useState } from 'react';
import axios from 'axios';

const RegistryItem = ({ item }) => {
  const [buyerFamily, setBuyerFamily] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!buyerFamily) {
      alert('You need to fill out the name field.');
      return;
    }
    try {
      await axios.post('/api/registry', { ...item, buyerFamily });
      setBuyerFamily('');
      alert('Purchase confirmed!');
    } catch (error) {
      alert('Failed to confirm purchase');
      console.error('Registry item purchase error:', error);
    }
  };

  return (
    <div>
      <img src={item.imageUrl} alt={item.title} style={{ width: '100px', height: '100px' }} />
      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
      <form onSubmit={handlePurchase}>
        <input
          type="text"
          value={buyerFamily}
          onChange={(e) => setBuyerFamily(e.target.value)}
          placeholder="Family Name"
          required
        />
        <button type="submit">Confirm Purchase</button>
      </form>
    </div>
  );
};

export default RegistryItem;
