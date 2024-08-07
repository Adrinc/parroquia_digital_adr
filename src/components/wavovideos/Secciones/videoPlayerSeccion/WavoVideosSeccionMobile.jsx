import React, { useState, useEffect } from 'react';
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import ReproductorVideoReactMobile from './widgets/ReproductorVideoReactMobile.jsx';
import { VideoPlayerLogic } from './typescript/video_player_logic.ts';
import VPSMobileStyle from './css/wavoVideosSeccionMobile.module.css';
import ListaIconosOpcionesMobile from './widgets/ListaIconosOpcionesMobile.jsx';

const supa = new VideoPlayerLogic();

const WavoVideoMobile = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

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
    let newStartIndex = currentStartIndex;
    let newVideos = allVideos.slice(newStartIndex, newStartIndex + 5);

    if (newVideos.length === 0) {
      newStartIndex = 0;
      newVideos = allVideos.slice(newStartIndex, newStartIndex + 5);
    }

    setVideoList(prevVideoList => [...prevVideoList, ...newVideos]);
    setCurrentStartIndex(newStartIndex + 5);

    if (newStartIndex + 5 >= allVideos.length) {
      newStartIndex = 0;
    }
  };

  const loadMoreData = (event) => {
    setTimeout(() => {
      fetchMoreVideos();
      event.target.complete();
    }, 500);
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
      <ListaIconosOpcionesMobile client:only="react"/>
    </IonContent>
  );
};

export default WavoVideoMobile;
