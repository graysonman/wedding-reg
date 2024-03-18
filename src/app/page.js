// app/index.page.js
'use client'
import { useClientEffect } from 'next/client';
import React, { useState } from 'react';
import axios from 'axios';
import RSVPForm from '../components/RSVPForm';
import RegistryItem from '../components/RegistryItem';

export default function Page() {
  const [registryItems, setRegistryItems] = useState([]);

  useClientEffect(() => { // This replaces useEffect for client-side only effects
    const fetchRegistryItems = async () => {
      try {
        const { data } = await axios.get('/api/registry-items');
        setRegistryItems(data);
      } catch (error) {
        console.error('Error fetching registry items:', error);
      }
    };

    fetchRegistryItems();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Our Wedding</h1>
      <RSVPForm />
      <div>
        <h2>Registry Items</h2>
        {registryItems.map((item) => (
          <RegistryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
