import { useContext } from 'react';
import './ButtonNumber.css';
import { CalcContext } from '../../App';

export default function ButtonNumber() {
  const { handleSetDisplayValue, buttonNumber, buttonFunction } =
    useContext(CalcContext);
  const nums = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map(
    (num) => {
      if (num === '0') {
        return (
          <button
            onClick={(e) => {
              handleSetDisplayValue(num);
              buttonNumber.current = e.target;
              buttonFunction.current = '';
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
          onClick={(e) => {
            handleSetDisplayValue(num);
            buttonNumber.current = e.target;
            buttonFunction.current = '';
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
