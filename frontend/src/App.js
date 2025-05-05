import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm'; 
import Positions from './components/Positions';
import PositionKanban from './components/PositionKanban';
import RoutingDebug from './components/RoutingDebug';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/positions" />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/position/:id" element={<PositionKanban />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
          {/* Ruta de respaldo para depuración */}
          <Route path="*" element={
            <div className="text-center mt-5">
              <h3>Ruta no encontrada</h3>
              <p>La ruta actual no coincide con ninguna ruta definida.</p>
            </div>
          } />
        </Routes>
        <RoutingDebug />
      </div>
    </BrowserRouter>
  );
};

export default App;