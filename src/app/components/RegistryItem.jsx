import React, { useState } from 'react';
import styles from '../style.css';

const RegistryItem = ({ item }) => {
  const [buyerFamily, setBuyerFamily] = useState('');
  const [isPurchased, setIsPurchased] = useState(item.bought); // Added state to track purchase status

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!buyerFamily) {
      alert('You need to fill out the name field.');
      return;
    }
    try {
      const response = await fetch('/api/registry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, famBought: buyerFamily }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      setIsPurchased(true);
      setBuyerFamily('');
      alert('Purchase confirmed!');
    } catch (error) {
      alert('Failed to confirm purchase');
      console.error('Registry item purchase error:', error);
    }
  };

  const purchasedStyle = {
    pointerEvents: isPurchased ? 'none' : 'auto',
    opacity: isPurchased ? 0.5 : 1,
  };

  return (
    <div className={styles.itemContainer} style={purchasedStyle}>
      <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
      {isPurchased ? (
        <span className={styles.itemName}>{item.name}</span>
      ) : (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
          {item.name}
        </a>
      )}
      {!isPurchased && (
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
      )}
    </div>
  );

};

export default RegistryItem;
