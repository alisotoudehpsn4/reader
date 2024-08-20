import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import BigButton from './components/BigButton';
import Categories from './components/Categories';

function App() {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true); // This will update the state when BigButton is clicked
  };

  const handleBack = () =>{
    setIsPressed(false);
  }

  return (
    <div className="App">
      {isPressed ? <Categories onBack={handleBack} /> : <BigButton onPress={handlePress} />}
    </div>
  );
}

export default App;
