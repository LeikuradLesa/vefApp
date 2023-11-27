import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Kennari from "./components/Kennari";
import Nemandi from "./components/VefsidaNemanda";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Nemandi" element={<Nemandi />} />
            <Route path="/kennari" element={<Kennari />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
