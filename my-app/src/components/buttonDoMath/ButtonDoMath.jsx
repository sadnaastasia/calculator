import { CalcContext } from '../../App';
import { useContext } from 'react';
import './ButtonDoMath.css';
export default function ButtonDoMath() {
  const { handleDoMath, buttonDoMathClicked } = useContext(CalcContext);
  return (
    <button
      onClick={() => {
        handleDoMath();
        buttonDoMathClicked.current = true;
      }}
      className="buttonDoMath"
    >
      =
    </button>
  );
}
