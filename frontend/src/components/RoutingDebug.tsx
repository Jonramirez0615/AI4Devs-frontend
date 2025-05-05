import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const RoutingDebug: React.FC = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      right: 0, 
      background: '#000', 
      color: '#fff', 
      padding: '10px', 
      zIndex: 9999,
      fontSize: '12px',
      maxWidth: '400px',
      overflow: 'auto'
    }}>
      <h4>Información de Ruta</h4>
      <p><strong>Pathname:</strong> {location.pathname}</p>
      <p><strong>Search:</strong> {location.search}</p>
      <p><strong>Hash:</strong> {location.hash}</p>
      <p><strong>Params:</strong> {JSON.stringify(params)}</p>
    </div>
  );
};

export default RoutingDebug; 