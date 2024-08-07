import React, { useEffect, useRef } from 'react';
import VideoStyle from '../css/reproductorVideo.module.css';

const ReproductorVideoReactMobile = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlayPause = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play().catch((error) => {
            console.error('Error playing video:', error);
          });
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handlePlayPause, {
      root: null,
      threshold: 0.5,
    });

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, [url]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.load();
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      loop
      className={VideoStyle.videoPlayer}
    />
  );
};

export default ReproductorVideoReactMobile;
