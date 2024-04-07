import React, { useState } from 'react';

export default function App() {
  const str = "6789";
  const [pass, setPass] = useState("");
  const [guess, setGuess] = useState(0);
  const [result, setResult] = useState("");
  const [guesses, setGuesses] = useState(15); // Track number of guesses

  // Function to generate password
  const passwordGenerator = () => {
    let passchar = "";
    for (let i = 0; i < 3; i++) {
      let num = str[Math.floor(Math.random() * 4)]; // Corrected random number selection
      passchar += num;
    }
    setPass(passchar);
  };

  // Check if guess matches the password
  const checkGuess = () => {
    if (guess === pass) {
      setResult("You won");
    } else {
      setResult("Try again");
      setGuesses(prevGuesses => prevGuesses - 1); // Decrease guesses
      setTimeout(() => {
        setResult("")
      }, 1000);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  // Handle adding and subtracting values to/from input
  const addToInput = (value) => {
    setGuess((prevGuess) => String(parseInt(prevGuess, 10) + value));
  };

  const subtractFromInput = (value) => {
    setGuess((prevGuess) => String(parseInt(prevGuess, 10) - value));
  };

  // Initialize password and guesses on component mount
  useState(() => {
    passwordGenerator();
  }, []);

  return (
    <>
      {guesses > 0 ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          marginLeft: '35vw' 
        }}>

          <div>Enter your guess made of 6, 7, 8, 9:</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '10px' }}>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => addToInput(100)}>+100</button>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => addToInput(10)}>+10</button>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => addToInput(1)}>+1</button>
          </div>

          <input 
            style={{ 
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              height: 'fit-content',
              width: '50vh'
            }} 
            type="text" 
            value={guess} 
            onChange={handleInputChange} 
          />
          <button className="my-4" onClick={checkGuess}>Submit</button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '10px' }}>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => subtractFromInput(100)}>-100</button>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => subtractFromInput(10)}>-10</button>
            <button style={{ width: 'calc(270% / 3)' }} onClick={() => subtractFromInput(1)}>-1</button>
          </div>
          <div>{result}</div>
          <div>Guesses remaining: {guesses}</div>
        </div>
      ) : (
<h1 >Game Over</h1>      )}
    </>
  );
}
