import React, { useEffect, useRef } from 'react';

export default function ReproductorVideoReact({ url }) {
    const videoRef = useRef(null);
  
    
    useEffect(() => {
        console.log(url);
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
            style={{
                position: 'relative',
                width: '100%',
                height: '75%',
                objectFit: 'cover',
                zIndex: 1
            }} 
        />
    );
}