import React, { useEffect, useRef, useState } from 'react';
import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from '@ionic/react';
import { VideoPlayerLogic } from '../typescript/video_player_logic.ts';
import modalStyles from '../css/CategoriasModal.module.css';

const supa = new VideoPlayerLogic();

const CategoriasModal = ({ onCategorySelect }) => {
  const modal = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await supa.getVideoCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleItemClick = (categoryId, categoryName) => {
    onCategorySelect(categoryId, categoryName);
    modal.current?.dismiss();
  };

  return (
    <IonModal ref={modal} trigger="open-categorimodal" initialBreakpoint={1} breakpoints={[0, 1]}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categorías</IonTitle>
          <IonButton slot="end" onClick={() => modal.current?.dismiss()}>Cerrar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className={modalStyles.block}>
        <IonList>
          {categories.map((category) => (
            <IonItem 
              key={category.id} 
              color="dark" 
              onClick={() => handleItemClick(category.id, category.name)} 
              className={modalStyles.categoryItem}
            >
              <IonThumbnail slot="start">
                <img src={category.poster_img} alt={category.name} className={modalStyles.portada} />
              </IonThumbnail>
              <p className={modalStyles.labeltx}>{category.name}</p>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CategoriasModal;
