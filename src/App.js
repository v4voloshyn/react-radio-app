import './App.css';
import { Radio } from './Radio';

function App() {
  return (
    <div className="App">
      <h1>Радіо плеєр українських радіо станцій</h1>
      <h4>Виберіть жанр, виберіть станцію, насолоджуйтесь музикою</h4>
      <Radio/>
    </div>
  );
}

export default App;
//http://all.api.radio-browser.info/json/stations/bycountry/Ukraine