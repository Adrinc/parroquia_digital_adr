import React, { useState, useEffect, useRef } from 'react';
import ReproductorVideoReactMobile from './widgets/ReproductorVideoReactMobile';
import { VideoPlayerLogic } from './typescript/video_player_logic.ts';
import VPSMobileStyle from './css/wavoVideosSeccionMobile.module.css';
import LoadingIndicator from './widgets/LoadingIndicator'; // Importa el componente de carga
import debounce from 'lodash/debounce';

const supa = new VideoPlayerLogic();

const VideoPlayerSectionMobile = () => {
  const [videoList, setVideoList] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchInitialVideos = async () => {
      const allVideos = await supa.getAllVideosList();
      setVideoList(allVideos.slice(0, 5));
    };

    fetchInitialVideos();
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!isFetching && !isLoading) {
          setIsFetching(true);
        }
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (isFetching) {
      loadMoreVideos();
    }
  }, [isFetching]);

  const loadMoreVideos = async () => {
    setIsLoading(true);

    const scrollPosition = window.scrollY;

    const allVideos = await supa.getAllVideosList();
    const newStartIndex = (currentStartIndex + 5) % allVideos.length;
    const newVideos = allVideos.slice(newStartIndex, newStartIndex + 5);

    if (newVideos.length === 0) {
      setVideoList(allVideos.slice(0, 5));
      setCurrentStartIndex(0);
    } else {
      setVideoList((prevVideos) => [...prevVideos, ...newVideos]);
      setCurrentStartIndex(newStartIndex);
    }

    setIsFetching(false);
    setIsLoading(false);

    window.scrollTo(0, scrollPosition);
  };

  return (
    <div className={VPSMobileStyle.section} ref={containerRef}>
      {videoList.map((video) => (
        <ReproductorVideoReactMobile
          key={video.video_id}  // Asegúrate de que video_id sea único
          url={video.video_url}
        />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default VideoPlayerSectionMobile;
