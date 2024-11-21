import { CalcContext } from '../../App';
import { useContext } from 'react';
import './ButtonDelete.css';
export default function ButtonDelete() {
  const { handleCEOperation, handleCOperation } = useContext(CalcContext);
  return (
    <button
      className="buttonCE"
      onClick={() => handleCEOperation()}
      onDoubleClick={() => handleCOperation()}
    >
      C/CE
    </button>
  );
}
