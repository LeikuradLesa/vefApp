
import React from "react";
import ListGroup from "./ListGroup";
import Login from "./Login";
import Signup from "./Signup";
import AboutUs from "./about-us";
import Footer from "./footer";

function Homepage() {
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
            
            <Login />
            <Signup />
            <AboutUs />
            <Footer />
        </React.Fragment>
    );
}

export default Homepage;