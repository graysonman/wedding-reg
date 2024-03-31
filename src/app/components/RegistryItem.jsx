import React, { useState } from 'react';
import styles from '../styles.module.css';
import '../global.css'

const RegistryItem = ({ item }) => {
  const [buyerFamily, setBuyerFamily] = useState('');
  const [isPurchased, setIsPurchased] = useState(item.bought);

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

  const itemClasses = `${styles.registryItem} ${isPurchased ? styles.grayout : ''}`;

  return (
    <div className={itemClasses}>
      <a href={item.link} target="_blank"rel="noopener noreferrer">
        <img className={styles.itemImage} src={item.img} alt={item.name}  />
      </a>
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
            className={styles.regInput}
            type="text"
            value={buyerFamily}
            onChange={(e) => setBuyerFamily(e.target.value)}
            placeholder="Family Name"
            required
          />
          <button className={styles.regSubmit} type="submit">Confirm Purchase</button>
        </form>
      )}
    </div>
  );

};

export default RegistryItem;