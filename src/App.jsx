import React, { useState } from 'react';

export default function App() {
  const str = "6789";
  const [pass, setPass] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  // Function to generate password
  const passwordGenerator = () => {
    let passchar = "";
    for (let i = 0; i < 3; i++) {
      let num = str[Math.floor(Math.random() * 4)];
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
      setTimeout(()=>{
        setResult("")
      },1000)
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  // Initialize password on component mount
  useState(() => {
    passwordGenerator();
  }, []);

  return (
    <div className='mx-auto'>
      <div>Enter your guess:</div>
      <input type="text" value={guess} onChange={handleInputChange} />
      <button onClick={checkGuess}>Submit</button>
      <div>{result}</div>
      
    </div>
  );
}
