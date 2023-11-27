import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/about-us";
import Homepage from "./components/Homepage";

function App() {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs />} />
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
