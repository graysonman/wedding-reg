import React, { useState } from 'react';

const RegistryItem = ({ item }) => {
  const [buyerFamily, setBuyerFamily] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!buyerFamily) {
      alert('You need to fill out the name field.');
      return;
    }
    try {
      const response = await fetch('../src/app/api/regItems.jsx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, famBought: buyerFamily }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json(); // Assuming the response body will be used for something
      setBuyerFamily('');
      alert('Purchase confirmed!');
    } catch (error) {
      alert('Failed to confirm purchase');
      console.error('Registry item purchase error:', error);
    }
  };

  return (
    <div>
      <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
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
