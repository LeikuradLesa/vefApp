import ListGroup from "./components/ListGroup";

import Login from "./components/Login";

import AboutUs from "./components/about-us";

import Footer from "./components/footer";

function App() {
  let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];

  const handleSelectectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <ListGroup
        items={items}
        heading="Leikur að lesa"
        onSelectItem={handleSelectectItem}
      />
      <Login></Login>
      <AboutUs></AboutUs>
      <Footer></Footer>
    </div>
    
  );
}

export default App;
