
import React from "react";
import ListGroup from "./ListGroup";
import Footer from "./footer";

function Nemandi() {
    let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];
    const handleSelectectItem = (item: any) => {
        console.log(item);
    };
    return (
        <React.Fragment>
            <ListGroup
                items={items}
                heading="Leikur að lesa"
                onSelectItem={handleSelectectItem}
            />
            
            <Footer />
        </React.Fragment>
    );
}

export default Nemandi;