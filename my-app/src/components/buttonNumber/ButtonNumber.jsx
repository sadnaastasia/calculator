import './ButtonNumber.css';
export default function ButtonNumber() {
  const nums = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','].map(
    (number) => {
      if (number === '0') {
        return <button className="buttonZero">{number}</button>;
      }
      return <button className="buttonNumber">{number}</button>;
    }
  );
  return nums;
}