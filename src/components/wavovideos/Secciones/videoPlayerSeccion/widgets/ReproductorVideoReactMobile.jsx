import React, { useEffect, useRef } from 'react';
import VideoStyle from '../css/reproductorVideo.module.css';

const ReproductorVideoReactMobile = ({ url, onEnded }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.src = url;
      videoElement.load();
    }

    const handlePlayPause = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play().catch((error) => console.error('Error playing video:', error));
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handlePlayPause, {
      root: null,
      threshold: 0.5,
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      muted
      loop
      onEnded={onEnded}
      className={VideoStyle.videoPlayer}
    />
  );
};

export default ReproductorVideoReactMobile;
