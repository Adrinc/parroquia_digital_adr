import React, { useEffect, useRef } from 'react';
import VideoStyle from '../css/reproductorVideo.module.css';

export default function ReproductorVideoReact({ url }) {
    const videoRef = useRef(null);
  
    
    useEffect(() => {
     
        if (videoRef.current) {
            videoRef.current.src = url;
            videoRef.current.load();
            videoRef.current.play();
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
}