import React from "react";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from "./navbar";

const Velgert: React.FC = () => {
    let items = ["Um okkur", "Hafðu samband", "Leiðbeningar", "Inskráning", "útskráning"];
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
            
            <h1 className="welcome">Velgert {user?.username}</h1>

            <Link to='/Nemandi' state={{ username: username }}>Til baka</Link>
            <Footer />
        </React.Fragment>
    );
}

export default Velgert;