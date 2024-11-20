import { CalcContext } from '../../App';
import { useContext } from 'react';
import './ButtonDoMath.css';
export default function ButtonDoMath() {
  const { handleDoMath } = useContext(CalcContext);
  return (
    <button onClick={() => handleDoMath()} className="buttonDoMath">
      =
    </button>
  );
}
