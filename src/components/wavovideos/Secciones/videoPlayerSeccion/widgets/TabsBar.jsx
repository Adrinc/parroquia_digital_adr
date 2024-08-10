import React, { useState } from 'react';
import { FaHome, FaCompass } from 'react-icons/fa';
import styles from '../css/TabsBar.module.css';
import PhotosModal from './PhotosModal.jsx';


const TabsBar = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    console.log(`${tab} selected`);
  };

  const handleModalDismiss = () => {
    setSelectedTab('home');
  };

  return (
    <>
      <PhotosModal onDismiss={handleModalDismiss} />
      <div className={styles.tabsBar}>
        <div
          className={`${styles.tabItem} ${selectedTab === 'home' ? styles.selected : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <FaHome className={styles.icon} />
          <span className={styles.text}>Home</span>
        </div>
        <div
          className={`${styles.tabItem} ${selectedTab === 'discovery' ? styles.selected : ''}`}
          onClick={() => handleTabClick('discovery')}
          id="open-photosmodal"
        >
          <FaCompass className={styles.icon} />
          <span className={styles.text}>Discovery</span>
        </div>
      </div>
    </>
  );
};

export default TabsBar;