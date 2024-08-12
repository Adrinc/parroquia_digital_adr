import React, { useEffect, useRef } from 'react';
import VideoStyle from '../css/reproductorVideo.module.css';

const ReproductorVideoReactMobile = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlayPause = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoElement.paused) {
            videoElement.play().catch((error) => {
              console.error('Error playing video:', error);
            });
          }
        } else {
          if (!videoElement.paused) {
            videoElement.pause();
          }
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
      muted
      loop
      className={VideoStyle.videoPlayer}
    />
  );
};

export default ReproductorVideoReactMobile;
