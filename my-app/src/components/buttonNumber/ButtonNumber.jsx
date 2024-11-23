import { useContext } from 'react';
import './ButtonNumber.css';
import { CalcContext } from '../../App';

export default function ButtonNumber() {
  const { buttonNumber, buttonFunction, handleSetDisplayValue } =
    useContext(CalcContext);
  const nums = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map(
    (num) => {
      if (num === '0') {
        return (
          <button
            onClick={() => {
              handleSetDisplayValue(num);
              if (buttonFunction.current) {
                buttonNumber.current = buttonFunction.current;
              }
            }}
            className="buttonZero"
          >
            {num}
          </button>
        );
      }
      return (
        <button
          key={num}
          onClick={() => {
            handleSetDisplayValue(num);
            if (buttonFunction.current) {
              buttonNumber.current = buttonFunction.current;
            }
          }}
          className="buttonNumber"
        >
          {num}
        </button>
      );
    }
  );
  return nums;
}
