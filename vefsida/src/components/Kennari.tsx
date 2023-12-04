
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useLocation } from 'react-router-dom';
import KennaraGogn from "./kennara-gogn";
import "./App.css";

function Kennari() {
    let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning"];
    const handleSelectectItem = (item: any) => {
        console.log(item);
    };

    const location = useLocation();
    const user = location.state as { username: string } | undefined;
    const username = user?.username

    return (
        <React.Fragment>
            <Navbar
                items={items}
                heading="Leikur að lesa"
                onSelectItem={handleSelectectItem}
            />
            <h1 className="welcome">Velkomin {user?.username}</h1>
            <div className="books">
                <h1>Hópar: </h1>
                <KennaraGogn username={username || 'Einhvað fór úrskeiðis'} />
            </div>
            
            <Footer />
        </React.Fragment>
    );
}

export default Kennari;