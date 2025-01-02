import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import ProjectDetails from './components/ProjectDetails.jsx';

function App() {
  return (
    <Router>
      <div className="bg-AppleCore min-h-screen text-Blueberry font-sans">
        {/* Navbar is common for all routes */}
        <Navbar />

        {/* Route for dynamic project details */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
