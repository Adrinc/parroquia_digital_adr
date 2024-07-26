import React from 'react';

import LCstyle from './ListaCategorias.module.css';

const ListaCategorias = ({ title, imageUrl, clicked }) => {
  return (
    <div
      className={[LCstyle.tarjeta, LCstyle.hitbox].join(' ')}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={LCstyle['text-content']}>
        <h1>{title}</h1>
        <p>Some description here</p>
      </div>
    </div>
  );
};

export default ListaCategorias;