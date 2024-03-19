'use client'
import React, { useState, useEffect } from 'react';
import RSVPForm from './components/RSVPForm';
import RegistryItem from './components/RegistryItem';
import styles from './styles.module.css';
import './global.css'


export default function Page() {
  const [registryItems, setRegistryItems] = useState([]);

  useEffect(() => {
    const fetchRegistryItems = async () => {
      try {
        const response = await fetch('/api/registry');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setRegistryItems(data);
      } catch (error) {
        console.error('Error fetching registry items:', error);
      }
    };

    fetchRegistryItems();
  }, []);

  return (
    <div className={styles.App}>
      <h1>Welcome to Our Wedding</h1>
      <RSVPForm />
      <div className={styles.textArea}>
        <h3>We will be moving in with my parents so the registry is small. </h3>
      </div>
      <div>
        <h2>Registry Items</h2>
        <div className={styles.registryItemList}>
        {registryItems.map((item) => (
          <RegistryItem key={item.id} item={item} />
        ))}
      </div>
      </div>
    </div>
  );
}