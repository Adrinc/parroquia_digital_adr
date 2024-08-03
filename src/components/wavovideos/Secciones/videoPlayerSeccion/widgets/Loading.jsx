import React from 'react';
import styles from '../css/LoadingIndicator.module.css'; // Crea un archivo CSS para el estilo

const Loading = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
