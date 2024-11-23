import { CalcContext } from '../../App';
import { useContext } from 'react';
import './ButtonPlusMinus.css';
export default function ButtonPlusMinus() {
  const { handleToggleNegative } = useContext(CalcContext);
  return (
    <button
      onClick={() => {
        handleToggleNegative();
      }}
      className="buttonPlusMinus"
    >
      +/-
    </button>
  );
}
