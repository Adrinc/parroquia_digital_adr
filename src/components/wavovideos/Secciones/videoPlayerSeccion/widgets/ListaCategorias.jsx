import React from 'react';
import LCstyle from '../css/listaCategorias.module.css';

const ListaCategorias = ({ title, imageUrl, isSelected }) => {
  return (

      <div
        className={`${LCstyle.tarjeta} ${isSelected ? LCstyle.selectedTarjeta : ''}`}
        style={{
          '--bg-image': `url(${imageUrl})`,
        }}
      >
        <div className={LCstyle.textContent}>
          <p className={`${isSelected ? LCstyle.selectedText : ''}`}>{title}</p>
        </div>
      </div>

  );
};

export default ListaCategorias;
