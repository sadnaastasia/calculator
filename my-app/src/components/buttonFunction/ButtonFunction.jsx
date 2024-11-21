import { useContext } from 'react';
import { CalcContext } from '../../App';
import './ButtonFunction.css';
export default function ButtonFunction() {
  const { handleFunctionType, buttonFunction } = useContext(CalcContext);

  const funcs = ['/', '*', '-', '+'].map((func) => {
    return (
      <button
        key={func}
        onClick={(e) => {
          handleFunctionType(func);
          e.target.focus();
          buttonFunction.current = e.target;
        }}
        className="buttonFunction"
      >
        {func}
      </button>
    );
  });
  return funcs;
}
