import React, { useState, useEffect } from 'react';
import ListaCategorias from './widgets/ListaCategorias.jsx';
import DropMenuCategorias from './widgets/DropMenuCategorias.jsx';
import ListaVideos from './widgets/ListaVideos.jsx';
import ReproductorVideoReact from './widgets/ReproductorVideoReact.jsx';
import { VideoPlayerLogic } from './typescript/video_player_logic.ts';
import VPSstyle from './css/wavoVideosSeccion.module.css'; 


const supa = new VideoPlayerLogic();

const WavoVideoDesktop = () => {
  const [videoItems, setVideoItems] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsResponsive(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await supa.getVideoCategories();
      setVideoItems(categories);


      if (categories.length > 0) {
        const firstCategoryId = categories[0].id;
        setSelectedCategory(firstCategoryId);
        const videos = await supa.getVideosByCategory(firstCategoryId);
        setVideoList(videos);

        if (videos.length > 0) {
          setSelectedVideo(videos[0]);
        } else {
          setSelectedVideo(null);
        }
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    const videos = await supa.getVideosByCategory(categoryId);
    setVideoList(videos);

    if (videos.length > 0) {
      // Set the first video as the selected video
      setSelectedVideo(videos[0]);
    } else {
      // Reset selected video if no videos are found
      setSelectedVideo(null);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section className={VPSstyle.section}>
      <div className={VPSstyle.background} />
    {/*   <IonicBoton /> */}
      <div className={VPSstyle.rowDosColumnas}>
        <div className={VPSstyle.columnaIzquierda}>
  
        
          <div className={VPSstyle.tituloContenedor}>
            <p className={VPSstyle.titulo}>Categorias</p>
          </div>
          {isResponsive ? (
            <DropMenuCategorias
              categories={videoItems}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategoryClick}
              client:only
            />
          ) : (
            <ul className={VPSstyle.ul}>
              {videoItems.map((item) => (
                <div key={item.id} className={VPSstyle.categoriaLista} onClick={() => handleCategoryClick(item.id)}>
                  <ListaCategorias
                    title={item.name}
                    imageUrl={item.poster_img}
                    onClick={() => handleCategoryClick(item.id)}
                    isSelected={selectedCategory === item.id}
                    
                  />
                </div>
              ))}
            </ul>
          )}
        </div>

        <div className={VPSstyle.columnaDerecha}>
          <ReproductorVideoReact url={selectedVideo ? selectedVideo.video_url : null} />
          <div className={VPSstyle.videoListHorizontal}>
            <ul>
              {videoList.map((item) => (
                <div key={item.video_id} className={VPSstyle.videoItem} onClick={() => handleVideoClick(item)}>
                  <ListaVideos
                    title={item.title}
                    videoClip={item.video_url}
                    imageUrl={item.poster_path}
                    isSelected={selectedVideo && selectedVideo.video_id === item.video_id}
                    client:only="react"
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

export default WavoVideoDesktop;
