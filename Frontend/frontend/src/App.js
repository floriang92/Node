import './App.css';
import Layout from "./Views/Layout";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './Views/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <HomePage></HomePage>
      </Router>
    </div>
  );
}

export default App;
