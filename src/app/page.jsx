'use client'
import React, { useState, useEffect } from 'react';
import RSVPForm from './components/RSVPForm';
import RegistryItem from './components/RegistryItem';
import styles from './styles.module.css';
import './global.css'
import bg from './images/background1.jpg'
import Image from 'next/image'
import us from "./images/us.jpg"


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
    <body style={{
      backgroundImage: `url(${bg.src})`,
      backgroundAttachment: 'fixed',
      
    }}> 
    <div className={styles.App}>
      <header>
        <Image
        src={us}
        width={325}
        height={400}
        alt="Grayson and Aimee"
        quality={100}
        style={{borderRadius:'2em'}}
        />
      <h1>Grayson and Aimee</h1>
      </header>
      <RSVPForm />
      <div className={styles.textArea}>
        <h3>We will be moving in with my parents so the registry is small. <br/>Cash gifts towards the honeymoon is appreciated. </h3>
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
    </body>
  );
}