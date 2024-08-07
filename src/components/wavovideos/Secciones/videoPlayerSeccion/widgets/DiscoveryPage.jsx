import React from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonModal } from '@ionic/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import discoveryStyles from '../css/DiscoveryPage.module.css';

const DiscoveryPage = () => {
  return (
    <IonModal trigger="open-videos-de-la-categoria" initialBreakpoint={1} breakpoints={[0, 1]}>
    <IonContent className={discoveryStyles.carrusel}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        className={discoveryStyles.carrusel}
      >
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
      <IonGrid>
        <IonRow>
          <IonCol>1</IonCol>
          <IonCol>xxxx2</IonCol>
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
    </IonContent>
    </IonModal>
  );
};

export default DiscoveryPage;
