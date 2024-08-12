import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import ReproductorVideoReactMobile from './widgets/ReproductorVideoReactMobile.jsx';
import { VideoPlayerLogic } from './typescript/video_player_logic.ts';
import VPSMobileStyle from './css/wavoVideosSeccionMobile.module.css';
import ListaIconosOpcionesMobile from './widgets/ListaIconosOpcionesMobile.jsx';
import TabsBar from './widgets/TabsBar.jsx';

const supa = new VideoPlayerLogic();

const WavoVideoMobile = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isInfiniteScrollDisabled, setIsInfiniteScrollDisabled] = useState(false);
  
  // Crear una referencia para el IonContent
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchInitialVideos = async () => {
      const videos = await supa.getAllVideosList();
      setAllVideos(videos);
      setVideoList(videos.slice(0, 5));
      setCurrentStartIndex(5);
      
      if (videos.length <= 10) {
        setIsInfiniteScrollDisabled(videos.length <= 5);
      }
    };
    fetchInitialVideos();
  }, []);

  const fetchMoreVideos = () => {
    if (isInfiniteScrollDisabled) {
      return;
    }

    let newStartIndex = currentStartIndex;
    let newVideos = allVideos.slice(newStartIndex, newStartIndex + 5);

    setVideoList(prevVideoList => [...prevVideoList, ...newVideos]);
    setCurrentStartIndex(newStartIndex + 5);

    if (newStartIndex + 5 >= allVideos.length || allVideos.length <= 10) {
      setIsInfiniteScrollDisabled(true);
    }
  };

  const loadMoreData = (event) => {
    setTimeout(() => {
      fetchMoreVideos();
      event.target.complete();
    }, 500);
  };

  const handlePlayButtonClick = (videos, initialVideoUrl = null) => {
    // Pausar todos los videos antes de cargar la nueva lista
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video) => video.pause());
  
    const videoIndex = initialVideoUrl
      ? videos.findIndex((video) => video.video_url === initialVideoUrl)
      : 0;
  
    setVideoList(videos.slice(videoIndex).concat(videos.slice(0, videoIndex)));
    setCurrentStartIndex(videoIndex + 5);
  
    if (videos.length <= 10) {
      setIsInfiniteScrollDisabled(videos.length <= 5);
    } else {
      setIsInfiniteScrollDisabled(false);
    }
  
    // Reposicionar el scroll al inicio (arriba)
    if (contentRef.current) {
      contentRef.current.scrollToTop(300);
    }
  
    // Esperar un pequeño tiempo para que el scroll se complete antes de reproducir
    setTimeout(() => {
      const videoElements = document.querySelectorAll('video');
      if (videoElements[0]) {
        videoElements[0].play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    }, 500);  // Tiempo aumentado para asegurar que la pausa esté completa
  };
  return (
    <IonContent ref={contentRef} className={VPSMobileStyle.content}>
      <div className={VPSMobileStyle.section}>
        {videoList.map((video, index) => (
          <div className={VPSMobileStyle.videoContainer} key={`${video.video_id}-${index}`}>
            <ReproductorVideoReactMobile url={video.video_url} />
          </div>
        ))}
        <IonInfiniteScroll
          onIonInfinite={loadMoreData}
          threshold="100px"
          disabled={isInfiniteScrollDisabled}
        >
          <IonInfiniteScrollContent loadingText="Cargando más videos..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>
      <ListaIconosOpcionesMobile onPlayButtonClick={handlePlayButtonClick} />
      <TabsBar />
    </IonContent>
  );
};

export default WavoVideoMobile;
