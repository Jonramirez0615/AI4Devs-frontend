import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Positions from './components/Positions';
import PositionKanban from './components/PositionKanban';
import AddCandidateForm from './components/AddCandidateForm';
import RecruiterDashboard from './components/RecruiterDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/positions" />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/position/:id" element={<PositionKanban />} />
          <Route path="/add-candidate" element={<AddCandidateForm />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
          {/* Ruta de respaldo para depuración */}
          <Route path="*" element={
            <div className="text-center mt-5">
              <h3>Ruta no encontrada</h3>
              <p>La ruta actual no coincide con ninguna ruta definida.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 