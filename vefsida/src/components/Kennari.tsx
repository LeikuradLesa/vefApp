
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

function Kennari() {
    let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];
    const handleSelectectItem = (item: any) => {
        console.log(item);
    };
    return (
        <React.Fragment>
            <Navbar
                items={items}
                heading="Leikur að lesa"
                onSelectItem={handleSelectectItem}
            />
            <h1>Kennara síða</h1>

            
            <Footer />
        </React.Fragment>
    );
}

export default Kennari;