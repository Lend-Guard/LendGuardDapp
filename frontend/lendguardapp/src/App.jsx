import logo from './logo.svg';
import Headers from "./Base/Header"
import Main  from "./Base/Main"
import './App.css';

function App() {
  return (
    <div className="App">
      <Headers/>
      <Main/>
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;