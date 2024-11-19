import { useContext } from 'react';
import './Display.css';
import { CalcContext } from '../../App';

export default function Display() {
  const { number } = useContext(CalcContext);
  return (
    <div className="containerDisplay">
      <h2 className="display">{number}</h2>
    </div>
  );
}
