import ListGroup from "./components/ListGroup";

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
    </div>
  );
}

export default App;
