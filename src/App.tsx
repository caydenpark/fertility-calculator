import React from 'react';
import logo from './logo.svg';
import FertilityCalculator from './components/fixed-fertility-calculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main className="w-full max-w-md">
          <FertilityCalculator />
        </main>
      </header>
    </div>
  );
}

export default App;
