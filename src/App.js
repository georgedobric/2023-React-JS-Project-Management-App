import logo from './logo.svg';
import './App.css';
import './components/Node.js'
import React, { useState } from 'react';
import Node from './components/Node';
//import Test from './components/Test';
function App() {


  return (
    <div>
      <Node />
    </div>
  );
}

//ReactDOM.render(<App />, document.getElementById('root'));
export default App;


/* // reactdom is no longer supported, switch to create root instead
import { createRoot } from 'react-dom';

// ...

// Create a root using createRoot
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render your React component
root.render(<App />);
*/