import React from "react";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import Navbar from "./navbar";
import NemandiGogn from "./Nemandi-gogn";

const Nemandi: React.FC = () => {
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
            
            <h1>Welkommin, {user?.username}</h1>

            <h1>Mínar bækur</h1>
            <NemandiGogn username={username || 'Einhvað fór úrskeiðis'} />
            <Footer />
        </React.Fragment>
    );
}

export default Nemandi;