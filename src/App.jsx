import React from 'react';
import News from './News';
import './App.css';
import Header from './compnents/Header';
// import News from './News';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        
      </header>
      <News />
    </div>
  );
}

export default App;