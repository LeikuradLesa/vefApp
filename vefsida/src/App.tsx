//import ListGroup from "./components/ListGroup";

import Login from "./components/Login";

import AboutUs from "./components/about-us";

import Navbar from "./components/navbar";

function App() {
  let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];

  const handleSelectectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div className="App">
      <Navbar
        items={items}
        heading="Leikur að lesa"
        onSelectItem={handleSelectectItem}
      />
      <Login></Login>
      <AboutUs></AboutUs>
    </div>
  );
}

export default App;
