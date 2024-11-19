import './App.css';
import Display from './components/display/Display.jsx';
import ButtonNumber from './components/buttonNumber/ButtonNumber.jsx';
import ButtonFunction from './components/buttonFunction/ButtonFunction.jsx';
import ButtonDoMath from './components/buttonDoMath/ButtonDoMath.jsx';
import ButtonCE from './components/buttonCE/ButtonCE.jsx';

function App() {
  return (
    <div className="App">
      <div className="calculator">
        <Display />
        <div className="pad">
          <div className="number-CE-pad">
            <ButtonCE />
            <div className="number-pad">
              <ButtonNumber />
            </div>
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
