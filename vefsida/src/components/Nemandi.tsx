import React from "react";
import ListGroup from "./ListGroup";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';

const Nemandi: React.FC = () => {
    let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];
    const handleSelectectItem = (item: any) => {
        console.log(item);
    };

    const location = useLocation();
    const user = location.state as { username: string } | undefined;

    return (
        <React.Fragment>
            <ListGroup
                items={items}
                heading="Leikur að lesa"
                onSelectItem={handleSelectectItem}
            />
            
            <h1>Welkommin, {user?.username}</h1>

            <h1>Mínar bækur</h1>
            
            <Footer />
        </React.Fragment>
    );
}

export default Nemandi;