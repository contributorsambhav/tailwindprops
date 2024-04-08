import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';

export default function App() {
    const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
    const [pass, setPass] = useState("");
    const [guess, setGuess] = useState(0);
    const [result, setResult] = useState("");
    const [guesses, setGuesses] = useState(15);

    useEffect(() => {
        passwordGenerator();
    }, []);

    const playSound = () => {
        setPlayStatus(Sound.status.PLAYING);
    };

    const stopSound = () => {
        setPlayStatus(Sound.status.STOPPED);
    };

    const passwordGenerator = () => {
        let passchar = "";
        for (let i = 0; i < 3; i++) {
            let num = "678"[Math.floor(Math.random() * 3)];
            passchar += num;
        }
        setPass(passchar);
        console.log(passchar)
    };

    const checkGuess = () => {
        if (guess === pass) {
            setResult("You won");
            playSound();
        } else {
            setResult("Try again");
            setGuesses(prevGuesses => prevGuesses - 1);
            setTimeout(() => {
                setResult("")
            }, 1000);
        }
    };

    const handleInputChange = (event) => {
        setGuess(event.target.value);
    };

    const addToInput = (value) => {
        setGuess((prevGuess) => String(parseInt(prevGuess, 10) + value));
    };

    const subtractFromInput = (value) => {
        setGuess((prevGuess) => String(parseInt(prevGuess, 10) - value));
    };

    return (
        <>
            <Sound url="/src/assets/win.wav" playStatus={playStatus} onFinishedPlaying={stopSound} />

            {guesses > 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    marginLeft: '35vw'
                }}>

                    <div>Enter your guess made of 6,7,8</div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '10px' }}>
                        <button style={{ width: '100%' }} onClick={() => addToInput(100)}>+100</button>
                        <button style={{ width: '100%' }} onClick={() => addToInput(10)}>+10</button>
                        <button style={{ width: '100%' }} onClick={() => addToInput(1)}>+1</button>
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
                        <button style={{ width: '100%' }} onClick={() => subtractFromInput(100)}>-100</button>
                        <button style={{ width: '100%' }} onClick={() => subtractFromInput(10)}>-10</button>
                        <button style={{ width: '100%' }} onClick={() => subtractFromInput(1)}>-1</button>
                    </div>
                    <div>{result}</div>
                    <div>Guesses remaining: {guesses}</div>
                </div>
            ) : (
                <h1>Game Over</h1>)}
        </>
    );
}
