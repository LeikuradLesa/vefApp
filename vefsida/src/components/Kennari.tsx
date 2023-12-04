
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useLocation } from 'react-router-dom';
import KennaraGogn from "./kennara-gogn";
import CreateHopur from "./create-hopur";
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
                <h1>Búa til og skrá í hóp</h1>
                <h6>Til þess að búa til hóp fyllið í reytina hér fyrir neðan</h6>
                <h6>og það er sama ferlið til þess að bæta við nemundum í hópinn</h6>
                
                <CreateHopur usernameKennara={username || 'Einhvað fór úrskeiðis'} />
            </div>
            <div className="books">
                <h1>Þínir hópar: </h1>
                <KennaraGogn username={username || 'Einhvað fór úrskeiðis'} />
            </div>
            
            <Footer />
        </React.Fragment>
    );
}

export default Kennari;