import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';

function App() {
  return (
    <div className="App">
      <div className="calculator">
        <Display />
        <div className="pad">
          <div className="number-pad">
            <ButtonNumber />
          </div>
          <div className="func-pad">
            <ButtonFunction />
            <ButtonDoMath />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
