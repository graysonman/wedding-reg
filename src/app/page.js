'use client'
import { useClientEffect } from 'next/client';
import React, { useState } from 'react';
import RSVPForm from '../../components/RSVPForm';
import RegistryItem from '../../components/RegistryItem';

export default function Page() {
  const [registryItems, setRegistryItems] = useState([]);

  useClientEffect(() => {
    const fetchRegistryItems = async () => {
      try {
        const response = await fetch('./api/regItems.js');
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
