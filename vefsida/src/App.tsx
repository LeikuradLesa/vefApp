import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Kennari from "./components/Kennari";
import Nemandi from "./components/Nemandi";
import Spurningar from './components/Spurningar';
import Velgert from "./components/Velgert";
import "./components/App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Nemandi" element={<Nemandi />} />
            <Route path="/Kennari" element={<Kennari />} />
            <Route path="/spurning/:v_nafnbokar?/:kaflaID?/:nafn?" element={<Spurningar />} />
            <Route path="/Velgert" element={<Velgert />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
