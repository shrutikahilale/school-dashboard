// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FeesCollection from './components/FeesCollection';
import AddFeesForm from './components/AddFeesForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flatpickr/dist/flatpickr.min.css';

function App() {
  const [currentView, setCurrentView] = useState('feesCollection');

  const showContent = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <Sidebar showContent={showContent} />
      <div className="content">
        {currentView === 'feesCollection' && <FeesCollection showContent={showContent}/>}
        {currentView === 'addFees' && <AddFeesForm showContent={showContent} />}
      </div>
    </div>
  );
}

export default App;
