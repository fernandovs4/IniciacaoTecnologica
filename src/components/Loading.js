import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
        
        <p>Atualizando tabela... Pode levar aproximadamente 30s.</p>

      
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
