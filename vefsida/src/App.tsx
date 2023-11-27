
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Nemandi from "./components/VefsidaNemanda";
import Navbar from "./components/navbar";

function App() {

  return (
    <div className="App">
      <Navbar
        items={items}
        heading="Leikur að lesa"
        onSelectItem={handleSelectectItem}
      />
      <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Nemandi" element={<Nemandi />} />

        </Routes>
        
      </div>
      </Router>
    </div>
    
  );
}

export default App;
