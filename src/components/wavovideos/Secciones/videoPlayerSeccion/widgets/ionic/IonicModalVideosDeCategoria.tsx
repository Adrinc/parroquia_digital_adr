import React, { useRef } from 'react';
import {createAnimation,IonButtons,IonButton,IonModal,IonHeader,IonContent,IonToolbar,IonTitle,IonRow,IonGrid,IonCol} from '@ionic/react';
import IMVCStyle from '../../css/IonicModalVideosDeCategoria.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { play } from 'ionicons/icons';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

function IonicModalVideosDeCategoria() {
  const modal = useRef<HTMLIonModalElement>(null);

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
    
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={dismiss}>Regresar</IonButton>
          </IonButtons>
          <IonTitle>CategoriasVar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
          autoplay={true}
          keyboard={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          zoom={true}
          className={IMVCStyle.carrusel}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>


        <IonGrid>
          <IonRow className={IMVCStyle.rower}>
            <IonCol>1</IonCol>
            <IonCol>2</IonCol>
            <IonCol>3</IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>1</IonCol>
            <IonCol>2</IonCol>
            <IonCol>3</IonCol>
            <IonCol>4</IonCol>
            <IonCol>5</IonCol>
            <IonCol>6</IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>1</IonCol>
            <IonCol>2</IonCol>
            <IonCol>3</IonCol>
            <IonCol>4</IonCol>
            <IonCol>5</IonCol>
            <IonCol>6</IonCol>
            <IonCol>7</IonCol>
            <IonCol>8</IonCol>
            <IonCol>9</IonCol>
            <IonCol>10</IonCol>
            <IonCol>11</IonCol>
            <IonCol>12</IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={() => console.log("boton reproducir clickeado")}>
            <IonIcon icon={play} />
          </IonFabButton>
        </IonFab>
      </IonContent>
        </IonModal>
   
    
  );
}

export default IonicModalVideosDeCategoria;