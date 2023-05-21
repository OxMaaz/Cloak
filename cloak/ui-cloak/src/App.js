import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from './intro/Container';
import Wrapper from './components/Wrapper';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/cloak" element={<Wrapper/>}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
