import ListGroup from "./components/ListGroup";

import Login from "./components/Login";

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
    </div>
    
  );
}

export default App;
