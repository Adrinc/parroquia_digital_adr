// ListaIconosOpcionesMobile.jsx
import React, { useState } from 'react';
import { FaThLarge } from 'react-icons/fa';
import VPSMobileStyle from '../css/ListaIconosOpcionesMobile.module.css';
import CategoriasModal from './CategoriasModal.jsx';
import IonicModalVideosDeCategoria from './ionic/IonicModalVideosDeCategoria.tsx';

const ListaIconosOpcionesMobile = ({ onPlayButtonClick }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const handleCategorySelect = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    document.getElementById('videos-de-categoria')?.click();
  };

  return (
    <>
      <div className={VPSMobileStyle.iconList}>
        <div className={VPSMobileStyle.iconContainer} id="open-categorimodal">
          <FaThLarge className={VPSMobileStyle.icon} />
          <span className={VPSMobileStyle.iconText}>Categorías</span>
        </div>
        <div id="videos-de-categoria"></div>
      </div>

      <CategoriasModal onCategorySelect={handleCategorySelect} />
      <IonicModalVideosDeCategoria
        selectedCategoryId={selectedCategoryId}
        selectedCategoryName={selectedCategoryName}
        onPlayButtonClick={onPlayButtonClick}
      />
    </>
  );
};

export default ListaIconosOpcionesMobile;
