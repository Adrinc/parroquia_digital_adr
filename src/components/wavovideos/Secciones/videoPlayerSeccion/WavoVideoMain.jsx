import React, { useState, useEffect } from 'react';
import VideoPlayerSectionMobile from './WavoVideosSeccionMobile.jsx';
import VideoPlayerSectionDesktop from './WavoVideosSeccionDesktop.jsx';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TabsBar from './widgets/TabsBar.jsx';


const WavoVideoMain = () => {
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsResponsive(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isResponsive ? (
    <IonApp>
          <VideoPlayerSectionMobile client:only="react" />
        {/*   <TabsBar /> */}
    </IonApp>
  ) : (
    <VideoPlayerSectionDesktop client:only="react"/>
  );
};

export default WavoVideoMain;
