import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
