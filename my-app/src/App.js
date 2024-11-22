import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';
import ButtonDelete from './components/buttonCE/ButtonDelete.jsx';
import { createContext, useEffect, useState, useRef } from 'react';

export const CalcContext = createContext();

function App() {
  const [number, setNumber] = useState('0');
  const [storedNumber, setStoredNumber] = useState('');
  const [resultChange, setResultChange] = useState('false');
  const [functionType, setFunctionType] = useState('');
  const [buttonFunctionTypeFocused, setButtonFunctionTypeFocused] =
    useState(false);

  const buttonFunction = useRef('');
  const buttonNumber = useRef('');

  const handleSetDisplayValue = (num) => {
    if (storedNumber && functionType && buttonFunctionTypeFocused) {
      if (num !== '.') {
        setNumber(num);
      } else {
        setNumber(`${'0' + num}`);
      }
      setButtonFunctionTypeFocused(false);
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
    if (number && !storedNumber) {
      buttonNumber.current = '';
      setStoredNumber(number);
      setFunctionType(type);
      setButtonFunctionTypeFocused(true);
    } else if (number && storedNumber) {
      if (buttonNumber.current === buttonFunction.current) {
        handleDoMath();
        buttonNumber.current = '';
        setResultChange(!resultChange);
      }
      setFunctionType(type);
      setButtonFunctionTypeFocused(true);
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setStoredNumber(number);
    }
  }, [resultChange]);

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
    setStoredNumber('');
  };

  const handleCEOperation = () => {
    setNumber('0');
    if (buttonFunction.current) {
      buttonNumber.current = '';
      buttonFunction.current.focus();
    }
  };

  const handleCOperation = () => {
    setNumber('0');
    setStoredNumber('');
    setFunctionType('');
    if (buttonFunction.current) {
      buttonFunction.current.blur();
    }
    buttonFunction.current = '';
  };

  return (
    <CalcContext.Provider
      value={{
        number,
        storedNumber,
        functionType,
        buttonFunction,
        buttonNumber,
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
