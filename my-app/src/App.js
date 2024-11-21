import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';
import ButtonDelete from './components/buttonCE/ButtonDelete.jsx';
import { createContext, useState } from 'react';

export const CalcContext = createContext();

function App() {
  const [number, setNumber] = useState('0');
  const [storedNumber, setStoredNumber] = useState('');
  const [functionType, setFunctionType] = useState('');
  const [buttonFunctionTypeFocused, setbuttonFunctionTypeFocused] =
    useState(false);
  const handleSetDisplayValue = (num) => {
    if ((storedNumber, functionType, buttonFunctionTypeFocused)) {
      if (num !== '.') {
        setNumber(num);
      } else {
        setNumber(`${'0' + num}`);
      }
      setbuttonFunctionTypeFocused(false);
    } else {
      if (!number.includes('.') && num !== '.' && num !== '0') {
        setNumber(`${(number + num).replace(/^0+/, '')}`);
      } else if (num === '0' && number === '0') {
        setNumber('0');
      } else {
        setNumber(`${number + num}`);
      }
    }
  };
  const handleFunctionType = (type) => {
    if (number) {
      setStoredNumber(number);
      setFunctionType(type);
      setbuttonFunctionTypeFocused(true);
    }
  };
  const handleDoMath = () => {
    switch (functionType) {
      case '+':
        setNumber(
          `${
            Math.round(
              (parseFloat(storedNumber) + parseFloat(number)) * 100000000
            ) / 100000000
          }`
        );
        break;

      case '-':
        setNumber(
          `${
            Math.round(
              (parseFloat(storedNumber) - parseFloat(number)) * 100000000
            ) / 100000000
          }`
        );
        break;

      case '/':
        setNumber(
          `${
            Math.round(
              (parseFloat(storedNumber) / parseFloat(number)) * 100000000
            ) / 100000000
          }`
        );
        break;

      case '*':
        setNumber(
          `${
            Math.round(
              parseFloat(storedNumber) * parseFloat(number) * 100000000
            ) / 100000000
          }`
        );
        break;

      default:
        break;
    }
  };
  const handleCEOperation = () => {
    setNumber('0');
  };
  const handleCOperation = () => {
    setNumber('0');
    setStoredNumber('');
    setFunctionType('');
  };

  return (
    <CalcContext.Provider
      value={{
        number,
        storedNumber,
        functionType,
        setNumber,
        setStoredNumber,
        setFunctionType,
        handleSetDisplayValue,
        handleFunctionType,
        handleDoMath,
        handleCEOperation,
        handleCOperation,
      }}
    >
      <div className="App">
        <div className="calculator">
          <Display />
          <div className="pad">
            <div className="number-CE-pad">
              <ButtonDelete />
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
