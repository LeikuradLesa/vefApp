import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/about-us";
import Homepage from "./components/Homepage";

function App() {
  let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];

  const handleSelectectItem = (item: string) => {
    console.log(item);
  };

  return (
    <Router>
      <div>
        <ListGroup
          items={items}
          heading="Leikur að lesa"
          onSelectItem={handleSelectectItem}
        />
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
