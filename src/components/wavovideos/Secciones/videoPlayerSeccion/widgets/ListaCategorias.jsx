import React from 'react';
import LCstyle from '../css/listaCategorias.module.css';

const ListaCategorias = ({ title, imageUrl, isSelected, onClick }) => {
  return (
    <div className={`${LCstyle.hitbox} ${isSelected ? LCstyle.selectedHitbox : ''}`} onClick={onClick}>
      <div
        className={`${LCstyle.tarjeta} ${isSelected ? LCstyle.selectedTarjeta : ''}`}
        style={{
          '--bg-image': `url(${imageUrl})`,
        }}
      >
        <div className={LCstyle.textContent}>
          <h1 className={`${isSelected ? LCstyle.selectedText : ''}`}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ListaCategorias;
