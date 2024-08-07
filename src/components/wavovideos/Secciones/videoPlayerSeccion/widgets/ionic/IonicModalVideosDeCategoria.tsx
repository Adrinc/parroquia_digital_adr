import React, { useRef, useEffect, useState } from 'react';
import { createAnimation, IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonRow, IonGrid, IonCol } from '@ionic/react';
import IMVCStyle from '../../css/IonicModalVideosDeCategoria.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlay } from 'react-icons/fa'; // Usar react-icons para el icono
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { VideoPlayerLogic } from '../../typescript/video_player_logic.ts';

const supa = new VideoPlayerLogic();

interface Video {
  video_id: number;
  poster_path: string;
  title: string;
  video_url: string;
}

interface IonicModalVideosDeCategoriaProps {
  selectedCategoryId: number | null;
  selectedCategoryName: string | null;
}

const IonicModalVideosDeCategoria: React.FC<IonicModalVideosDeCategoriaProps> = ({ selectedCategoryId, selectedCategoryName }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      const fetchVideos = async () => {
        const fetchedVideos = await supa.getVideosByCategory(selectedCategoryId);
        setVideos(fetchedVideos);
      };
      fetchVideos();
    }
  }, [selectedCategoryId]);

  function dismiss() {
    modal.current?.dismiss();
  }

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction('reverse');
  };

  return (
    <IonModal
      id="example-modal"
      ref={modal}
      trigger="videos-de-categoria"
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
    >
      <IonContent className={IMVCStyle.block}>
        <IonHeader translucent={true} className={IMVCStyle.header}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={dismiss}>Regresar</IonButton>
            </IonButtons>
            <IonTitle>{selectedCategoryName}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className={IMVCStyle.carouselContainer}>
          <Swiper
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            autoplay={true}
            keyboard={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            zoom={true}
            className={IMVCStyle.carrusel}
          >
            {videos.map((video) => (
              <SwiperSlide key={video.video_id} className={IMVCStyle.swiperSlide}>
                <img src={video.poster_path} alt={video.title} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={IMVCStyle.customButtonContainer}>
            <button className={IMVCStyle.customButton} onClick={() => console.log("boton reproducir clickeado")}>
              <FaPlay className={IMVCStyle.customButtonIcon} />
            </button>
          </div>
        </div>

        <IonGrid>
          <IonRow className={IMVCStyle.rower}>
            {videos.map((video) => (
              <IonCol size="6" key={video.video_id} className={IMVCStyle.gridItem}>
                <div className={IMVCStyle.card}>
                  <img src={video.poster_path}  alt={video.title} onClick={() => console.log(video.video_url)} />
                  <p>{video.title}</p>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default IonicModalVideosDeCategoria;
