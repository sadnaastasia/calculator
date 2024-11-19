import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';
import ButtonCE from './components/buttonCE/ButtonCE.jsx';
import { createContext, useState } from 'react';

export const CalcContext = createContext();

function App() {
  const [number, setNumber] = useState('0');
  const [storedNumber, setStoredNumber] = useState('');
  const [functionType, setFunctionType] = useState('');
  const handleSetDisplayValue = (num) => {
    if (storedNumber) setNumber('');
    if (!number.includes('.') && num !== '.') {
      setNumber(`${(number + num).replace(/^0+/, '')}`);
    } else {
      setNumber(`${number + num}`);
    }
  };
  const handleFunctionType = (type) => {
    if (number) {
      setStoredNumber(number);
      setFunctionType(type);
    }
  };
  return (
    <CalcContext.Provider
      value={{
        number,
        handleSetDisplayValue,
        setStoredNumber,
        setFunctionType,
        handleFunctionType,
      }}
    >
      <div className="App">
        <div className="calculator">
          <Display />
          <div className="pad">
            <div className="number-CE-pad">
              <ButtonCE />
              <div className="number-pad">
                <ButtonNumber />
              </div>
            </div>
            <div className="func-pad">
              <ButtonFunction />
              <ButtonDoMath />
            </div>
          </div>
        </div>
      </div>
    </CalcContext.Provider>
  );
}

export default App;
