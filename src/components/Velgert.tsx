import React from "react";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Velgert: React.FC = () => {
    const location = useLocation();
    const user = location.state as { username: string } | undefined;
    const username = user?.username

    return (
        <React.Fragment>
            <h1 className="welcome">Velgert {user?.username}</h1>

            <Link to='/Nemandi' state={{ username: username }}>Til baka</Link>
            <Footer />
        </React.Fragment>
    );
}

export default Velgert;