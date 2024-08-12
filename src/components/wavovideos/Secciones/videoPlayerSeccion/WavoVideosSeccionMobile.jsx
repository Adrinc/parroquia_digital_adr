import React, { useState, useEffect } from 'react';
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
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState(null); // Estado para la categoría seleccionada
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialVideos = async () => {
      const videos = await supa.getAllVideosList();
      setAllVideos(videos);
      setVideoList(videos.slice(0, 5));
      setCurrentStartIndex(5);
    };
    fetchInitialVideos();
  }, []);

  const fetchMoreVideos = () => {
    if (loading) return;
    setLoading(true);

    const sourceVideos = selectedCategoryVideos || allVideos;
    let newStartIndex = currentStartIndex;
    let newVideos = sourceVideos.slice(newStartIndex, newStartIndex + 5);

    if (newVideos.length > 0) {
      setVideoList(prevVideoList => [...prevVideoList, ...newVideos]);
      setCurrentStartIndex(newStartIndex + 5);
    } else if (newStartIndex >= sourceVideos.length) {
      setCurrentStartIndex(0);
    }

    setLoading(false);
  };

  const loadMoreData = (event) => {
    setTimeout(() => {
      fetchMoreVideos();
      event.target.complete();
    }, 500);
  };

  // Función para actualizar la lista de reproducción
  const handlePlayButtonClick = (videos, initialVideoUrl = null) => {
    const videoIndex = initialVideoUrl
      ? videos.findIndex((video) => video.video_url === initialVideoUrl)
      : 0;

    setSelectedCategoryVideos(videos); // Actualizamos la categoría seleccionada
    setVideoList(videos.slice(videoIndex).concat(videos.slice(0, videoIndex)));
    setCurrentStartIndex(videoIndex + 5);
  };

  return (
    <IonContent className={VPSMobileStyle.content}>
      <div className={VPSMobileStyle.section}>
        {videoList.map((video, index) => (
          <div className={VPSMobileStyle.videoContainer} key={`${video.video_id}-${index}`}>
            <ReproductorVideoReactMobile url={video.video_url} />
          </div>
        ))}
        <IonInfiniteScroll onIonInfinite={loadMoreData} threshold="100px">
          <IonInfiniteScrollContent loadingText="Cargando más videos..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>
      <ListaIconosOpcionesMobile onPlayButtonClick={handlePlayButtonClick} />
      <TabsBar />
    </IonContent>
  );
};

export default WavoVideoMobile;
