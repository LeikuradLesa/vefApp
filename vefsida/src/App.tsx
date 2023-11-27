import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Kennari from "./components/Kennari";

function App() {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/kennari" element={<Kennari />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
