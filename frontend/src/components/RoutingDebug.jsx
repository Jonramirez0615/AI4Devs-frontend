import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const RoutingDebug = () => {
  const location = useLocation();
  const params = useParams();
  const [minimized, setMinimized] = useState(true);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      right: 0, 
      background: 'rgba(0, 0, 0, 0.6)', 
      color: '#fff', 
      padding: minimized ? '5px' : '10px', 
      zIndex: 9999,
      fontSize: '11px',
      maxWidth: minimized ? '100px' : '300px',
      overflow: 'hidden',
      borderTopLeftRadius: '5px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)'
    }} onClick={() => setMinimized(!minimized)}>
      {minimized ? (
        <div className="text-center">
          <small>Debug</small>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <small style={{ fontWeight: 'bold' }}>Información de Ruta</small>
            <small style={{ opacity: 0.7 }}>(click para minimizar)</small>
          </div>
          <p style={{ margin: '3px 0', fontSize: '10px' }}><strong>Ruta:</strong> {location.pathname}</p>
          <p style={{ margin: '3px 0', fontSize: '10px' }}><strong>Parámetros:</strong> {JSON.stringify(params)}</p>
        </>
      )}
    </div>
  );
};

export default RoutingDebug; 