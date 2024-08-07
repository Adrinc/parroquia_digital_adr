import React, { useRef, useEffect, useState } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import PMStyle from '../css/PhotosModal.module.css';
import { VideoPlayerLogic } from '../typescript/video_player_logic.ts';



const supa = new VideoPlayerLogic();

const PhotosModal = ({ onDismiss }) => {
  const modal = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos = await supa.getAllVideosList();
      setVideos(fetchedVideos);
    };
    fetchVideos();
  }, []);

  const dismiss = () => {
    modal.current?.dismiss();
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <IonModal ref={modal} trigger="open-photosmodal" initialBreakpoint={1} breakpoints={[0, 1]}>
      <IonContent className={PMStyle.block}>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={dismiss}>Regresar</IonButton>
            </IonButtons>
            <IonTitle>Fotos</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {videos.map((video) => (
              <IonCol size="6" key={video.video_id}>
                <div className={PMStyle.card}>
                  <div className={PMStyle.imageContainer}>
                    <img src={video.poster_path} alt={video.title} className={PMStyle.image} />
                    <div className={PMStyle.imageText}>{video.title}</div>
                  </div>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default PhotosModal;