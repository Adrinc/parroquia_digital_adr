import React from 'react';
import LVstyle from './ListaVideos.module.css';

const ListaVideos = ({ title, imageUrl }) => {
  return (
    <div className={LVstyle.hitbox}>
      <div
        className={LVstyle.tarjeta}
        style={{
          backgroundImage: `linear-gradient(to bottom, #000000b3,#000000,#000000,#000000, #000000aa), url(${imageUrl})`,
        }}
      >
        <img className={LVstyle.img} src={imageUrl} alt="Imagen" />
        <div className={LVstyle.textContent}>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ListaVideos;
