import './ButtonFunction.css';
export default function ButtonFunction() {
  const funcs = ['/', '*', '-', '+'].map((func) => {
    return <button className="buttonFunction">{func}</button>;
  });
  return funcs;
}
