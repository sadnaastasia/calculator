import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';
import ButtonDelete from './components/buttonCE/ButtonDelete.jsx';
import ButtonPlusMinus from './components/buttonPlusMinus/ButtonPlusMinus.jsx';
import { createContext, useEffect, useState, useRef } from 'react';

export const CalcContext = createContext();

function App() {
  let [number, setNumber] = useState('0');
  //number on display
  let [storedNumber, setStoredNumber] = useState('');
  //number in memory
  const [resultChange, setResultChange] = useState(false);
  //use this state for changing stored number after rendering
  //when we make calculations with buttonFunctions (without using operator "=")
  const [functionType, setFunctionType] = useState('');
  //math operator
  const [buttonFunctionTypeFocused, setButtonFunctionTypeFocused] =
    useState(false);
  //use this state for entering first number after clicking on buttonFunction
  const [stringOnDisplay, setStringOnDisplay] = useState(false);
  //use this state for disabling clicking on ButtonFunction when
  //we have a string on the display

  const buttonFunction = useRef('');
  //this ref we need for reffering to proper ButtonFunction (for focusing on it)
  const buttonNumber = useRef('');
  //this ref we need when we use Button CE (one click on C/CE Button)
  //and want to toggle between ButtonFunctions
  //so that calculations are not performed with number "0"

  const buttonDoMathClicked = useRef(false);
  //use this ref for entering a number from the first digit
  //after doing math

  const handleSetDisplayValue = (num) => {
    setStringOnDisplay(false);
    if (buttonFunctionTypeFocused) {
      if (num !== '.') {
        setNumber(num);
      } else {
        setNumber(`${'0' + num}`);
      }
      setButtonFunctionTypeFocused(false);
      //this condition we use for entering first number after clicking on buttonFunction
    } else if (buttonDoMathClicked.current) {
      if (num !== '.') {
        setNumber(num);
      } else {
        setNumber(`${'0' + num}`);
      }
      buttonDoMathClicked.current = false;
      //this condition we use after clicking "="
    } else {
      if (!number.includes('.') && num !== '.' && num !== '0') {
        setNumber(`${(number + num).replace(/^0+/, '')}`);
        //this condition we use when our Number is "0"
        //and we try enter num > 0
      } else if (num === '0' && number === '0') {
        setNumber('0');
      } else {
        setNumber(`${number + num}`);
      }
    }
  };

  useEffect(() => {
    if (number > 99999999) {
      setNumber('Calculator can process numbers ≤ 99999999');
      setStoredNumber('');
      setFunctionType('');
      buttonFunction.current = '';
      buttonNumber.current = '';
      buttonDoMathClicked.current = true;
      setStringOnDisplay(true);
      //processing long numbers
    }
  }, [number]);

  const handleFunctionType = (type) => {
    if (number && !storedNumber) {
      buttonNumber.current = '';
      setStoredNumber(number);
      setFunctionType(type);
      setButtonFunctionTypeFocused(true);
      //this condition we need when we still do not have storedNumber
    } else if (number && storedNumber) {
      if (buttonNumber.current === buttonFunction.current) {
        handleDoMath();
        buttonNumber.current = '';
        setResultChange(!resultChange);
        //this condition we need for not making calculations witn Number "0"
        //when we toggle between ButtonFunctions after
        //one click on Button C/CE
      }
      setFunctionType(type);
      setButtonFunctionTypeFocused(true);
    }
  };

  const firstRender = useRef(true);
  //for omitting first render

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setStoredNumber(number);
    }
  }, [resultChange]);
  //updating storedNumber every time we make calculations with math operators
  //(without using operator "=")

  const handleToggleNegative = () => {
    if (number > 0) {
      setNumber(`-${number}`);
    } else if (number < 0) {
      setNumber(`${number.slice(1)}`);
    }
  };

  const handleDoMath = () => {
    if ((number, storedNumber)) {
      if (number === '0' && functionType === '/') {
        setNumber('Error');
        setStoredNumber('');
        setFunctionType('');
        buttonFunction.current = '';
        buttonNumber.current = '';
        buttonDoMathClicked.current = true;
        setStringOnDisplay(true);
        return;
        //processing division by "0"
      }
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
      setFunctionType('');
      buttonFunction.current = '';
      buttonNumber.current = '';
    }
  };

  const handleCEOperation = () => {
    setNumber('0');
    if (buttonFunction.current) {
      buttonNumber.current = '';
      //we need this for preventing making calculations with Number "0"
      //while toggling between ButtonFunctions
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
    buttonNumber.current = '';
  };

  return (
    <CalcContext.Provider
      value={{
        number,
        storedNumber,
        stringOnDisplay,
        functionType,
        buttonFunction,
        buttonNumber,
        buttonDoMathClicked,
        setNumber,
        setStoredNumber,
        setFunctionType,
        handleSetDisplayValue,
        handleFunctionType,
        handleToggleNegative,
        handleDoMath,
        handleCEOperation,
        handleCOperation,
      }}
    >
      <div className="App">
        <div className="calculator">
          <Display />
          <div className="pad">
            <div className="number-CE-Negative-number-pad">
              <div className="number-CE-Negative-pad">
                <ButtonDelete />
                <ButtonPlusMinus />
              </div>
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
