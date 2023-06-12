import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./intro/Container";
import Wrapper from "./components/Wrapper";
import DisclaimerPopup from "./components/DisclaimerPopup";
import { useEffect, useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(true);
  }, []);

  return (
    <div className="App">
      <DisclaimerPopup />
      <Router>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/cloak" element={<Wrapper />} />
        </Routes>
      </Router>
      <DisclaimerPopup open={openModal} onClose={() => setOpenModal(false)}>
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">working</h3>
          <button onClick={() => setOpenModal(false)}>yes working</button>
        </div>
      </DisclaimerPopup>
    </div>
  );
}

export default App;
