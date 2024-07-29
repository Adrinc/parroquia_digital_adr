
import LVstyle from '../css/listaVideos.module.css';

const ListaVideos = ({ title, imageUrl, isSelected }) => {
  return (
    <div className={`${LVstyle.hitbox} ${isSelected ? LVstyle.selected : ''}`}>
      <div
        className={`${LVstyle.tarjeta} ${isSelected ? LVstyle.selectedTarjeta : ''}`}
        style={{
          '--bg-image': `url(${imageUrl})`,
        }}
      >
        <div className={LVstyle.textContent}>
          <h1 className={`${isSelected ? LVstyle.selectedText : ''}`}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ListaVideos;
