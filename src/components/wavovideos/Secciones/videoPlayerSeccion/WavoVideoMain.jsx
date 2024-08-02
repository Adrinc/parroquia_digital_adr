import React, { useState, useEffect } from 'react';
import VideoPlayerSectionMobile from './WavoVideosSeccionMobile.jsx';
import VideoPlayerSectionDesktop from './WavoVideosSeccionDesktop.jsx';


const VideoPlayerSectionMain = () => {
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsResponsive(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isResponsive ? (
    <VideoPlayerSectionMobile client:only="react" />
  ) : (
    <VideoPlayerSectionDesktop client:only="react"/>
  );
};

export default VideoPlayerSectionMain;
