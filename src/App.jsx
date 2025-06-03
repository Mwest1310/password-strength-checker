import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [mode, setMode] = useState('dark-mode')
    const [password, setPassword] = useState('');
    const [advice, setAdvice] = useState('Password should be at least 8 characters long');
    const [numOfChars, setNumOfChars] = useState(0);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [areNumbers, setAreNumbers] = useState(false);
    const [areSymbols, setAreSymbols] = useState(false);
    const [score, setScore] = useState(0);

    const handleModeChange = () => {
        const newMode = mode === "dark-mode" ? "light-mode" : "dark-mode";
        setMode(newMode);
    };

    const checkPassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Create separate variables for the checks. This is to make the score update live
        const length = newPassword.length;
        const hasUpper = /[A-Z]/.test(newPassword);
        const hasLower = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSymbol = /[^a-zA-Z0-9\s:]/.test(newPassword);

        // Set the state here
        setNumOfChars(length);
        setIsUpperCase(hasUpper);
        setIsLowerCase(hasLower);
        setAreNumbers(hasNumber);
        setAreSymbols(hasSymbol);

        // Calls a function that calculates the score based on these parameters
        const newScore = scoreCalc(length, hasUpper, hasLower, hasNumber, hasSymbol);
        setScore(newScore);

        const currAdvice = adviceGen(length, hasUpper, hasLower, hasNumber, hasSymbol);
        setAdvice(currAdvice);
    };


    const scoreCalc = (length, hasUpper, hasLower, hasNumber, hasSymbol) => {
        let currentScore = 0;
        if(length < 8) return 0; // Password should be at least 8 chars
        if(length >= 8) currentScore++; // Minimum length
        if(length >= 12) currentScore++; // Bonus point for recommended length
        if(hasUpper) currentScore++; // Point for at least one upper-case letter
        if(hasLower) currentScore++; // Point for at least one lower-case letter
        if(hasNumber) currentScore++; // Point for at least one number
        if(hasSymbol) currentScore++; // Point for at least one symbol
        return currentScore;
    }

    // Only shows one piece of advice at a time, ordering from most important to least important
    const adviceGen = (length, hasUpper, hasLower, hasNumber, hasSymbol) => {
        if(length < 8) return "Password should be at least 8 characters long";
        if(!hasLower) return "Please include at least one lower-case letter";
        if(!hasUpper) return "Please include at least one upper-case letter";
        if(!hasNumber) return "Please include at least one number";
        if(!hasSymbol) return "Please include at least one symbol";
        if(length < 12) return "Try to make the password at least 12 characters long";
    }

   return(
        <div id="container" class={mode}>
            <div id="password-checker-container">
                <div id="toggle-row"><FontAwesomeIcon onClick={handleModeChange} id="toggle" icon={mode === "dark-mode" ? faLightbulb : faMoon} /></div>
                <h1>Please Enter Your Password Below</h1>
                <div id="input">
                    <label for="password">Make your password at least 8 characters long</label>
                    <input name="password" value={password} type="text" placeholder="Please input your password" id="password" onChange={checkPassword}></input>
                </div>
                <div id="output-checks">
                    <p id="num-of-characters" className={numOfChars >= 12 ? "active" : "inactive"}>{numOfChars} Characters</p>
                    <div id="check-display">
                        <p className={isUpperCase ? "active" : "inactive"}>Upper-case</p>
                        <p className={areNumbers ? "active" : "inactive"}>Numbers</p>
                        <p className={isLowerCase ? "active" : "inactive"}>Lower-case</p>
                        <p className={areSymbols ? "active" : "inactive"}>Symbols</p>
                    </div>
                </div>
                <div id="output-line" className={`_${score}`}></div>
                <div id="output-advice">
                    <p>{advice}</p>
                </div>
            </div>
        </div>
        
    );
};

export default App;