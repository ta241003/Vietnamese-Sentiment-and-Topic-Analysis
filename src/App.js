import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SingleAnalysis from './components/singleAnalysis/SingleAnalysis';
import BatchAnalysis from './components/batchAnalysis/BatchAnalysis';
import CompareModels from './components/compare/CompareModels';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'single':
        return <SingleAnalysis />;
      case 'batch':
        return <BatchAnalysis />;
      case 'compare':
        return <CompareModels />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNavChange={setActiveTab} activeTab={activeTab} />
      {renderContent()}
    </div>
  );
}

export default App;