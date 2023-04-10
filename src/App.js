import logo from './logo.svg';
import './App.css';

function App() {
  const urlEndpoint = 'https://ik.imagekit.io/oxtwc3opy';

// optional parameters (needed for client-side upload)
const publicKey = 'public_ipLWb/WJh0FRyyAOLOkOSU1Iwxw='; 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
