import React, { useState } from 'react';
import { FaThLarge, FaComments, FaHeart, FaShareAlt } from 'react-icons/fa';
import VPSMobileStyle from '../css/ListaIconosOpcionesMobile.module.css';
import CategoriasModal from './CategoriasModal.jsx';

import IonicModalVideosDeCategoria from './ionic/IonicModalVideosDeCategoria.tsx';


const ListaIconosOpcionesMobile = () => {

  const handleIconClick = (iconName) => {
    console.log(`${iconName} icon clicked`);
  };


  return (
    <>
      <div className={VPSMobileStyle.iconList}>
        <div className={VPSMobileStyle.iconContainer} id="open-categorimodal">
          <FaThLarge className={VPSMobileStyle.icon} />
          <span className={VPSMobileStyle.iconText}>Categorías</span>
        </div>
        <div className={VPSMobileStyle.iconContainer} onClick={() => handleIconClick('dddd')} id="videos-de-categoria">
          <FaComments className={VPSMobileStyle.icon} />
          <span className={VPSMobileStyle.iconText}>Comentarios</span>
        </div>
        <div className={VPSMobileStyle.iconContainer} id="open-videos-de-la-categoria">
          <FaHeart className={VPSMobileStyle.icon} />
          <span className={VPSMobileStyle.iconText}>Favoritos</span>
        </div>
        <div className={VPSMobileStyle.iconContainer} onClick={() => handleIconClick('Compartir')}>
          <FaShareAlt className={VPSMobileStyle.icon} />
          <span className={VPSMobileStyle.iconText}>Compartir</span>
        </div>
      </div>
      <CategoriasModal client:only="react" />

      <IonicModalVideosDeCategoria />
      
    </>
  );
};

export default ListaIconosOpcionesMobile;
