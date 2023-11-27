import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/about-us";
import Footer from "./components/footer";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs />} />
          
        </Routes>
        <Login />
        <Signup />
        <AboutUs />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
