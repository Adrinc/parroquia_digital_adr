import React, { useState, useEffect } from 'react';
import ListaCategorias from '../widgets/ListaCategorias';
import ListaVideos from '../widgets/ListaVideos';
import ReproductorVideoReact from '../widgets/ReproductorVideoReact';
import { SupaBaseConection } from '../../../supabase/supabase';
import VPSstyle from './VideoPlayerSection.module.css'; // Import the CSS module

const supabaseInstance = new SupaBaseConection();

const VideoPlayerSection = () => {
  const [videoItems, setVideoItems] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('./videos/iglesia5.mp4');

  useEffect(() => {
    const fetchData = async () => {
      const categories = await supabaseInstance.getVideoCategories();
      setVideoItems(categories);
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    const videos = await supabaseInstance.getVideosByCategory(categoryId);
    setVideoList(videos);
  };

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <section className={VPSstyle.section}>
      <div className={VPSstyle.rowDosColumnas}>
        <div className={VPSstyle.columnaIzquierda}>
          <h1 className="text-3xl text-center text-white items-center justify-center">Categorias</h1>
          <ul className={VPSstyle.ul}>
            {videoItems.map((item) => (
              <div key={item.id} className="lista" onClick={() => handleCategoryClick(item.id)}>
                <ListaCategorias
                  title={item.name}
                  imageUrl={item.poster_img}
                  clicked={item.id}
                />
              </div>
            ))}
          </ul>
        </div>

        <div className={VPSstyle.columnaDerecha}>
          <ReproductorVideoReact url={selectedVideo} />
          <div className={VPSstyle.videoListHorizontal}>
            <ul>
              {videoList.map((item) => (
                <div key={item.id} className={VPSstyle.videoItem} onClick={() => handleVideoClick(item.video)}>
                  <ListaVideos
                    title={item.title}
                    videoClip={item.video}
                    imageUrl={item.poster_path}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerSection;
