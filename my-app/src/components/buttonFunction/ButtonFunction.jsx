import { useContext } from 'react';
import { CalcContext } from '../../App';
import './ButtonFunction.css';
export default function ButtonFunction() {
  const { handleFunctionType } = useContext(CalcContext);

  const funcs = ['/', '*', '-', '+'].map((func) => {
    return (
      <button
        key={func}
        onClick={(e, func) => {
          handleFunctionType(func);
          e.target.focus();
        }}
        className="buttonFunction"
      >
        {func}
      </button>
    );
  });
  return funcs;
}
