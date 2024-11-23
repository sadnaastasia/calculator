import { useContext } from 'react';
import { CalcContext } from '../../App';
import './ButtonFunction.css';
export default function ButtonFunction() {
  const { handleFunctionType, buttonFunction, stringOnDisplay } =
    useContext(CalcContext);

  const funcs = ['/', '*', '-', '+'].map((func) => {
    return (
      <button
        disabled={stringOnDisplay}
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
