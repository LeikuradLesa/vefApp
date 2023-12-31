import React from "react";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import NemandiGogn from "./Nemandi-gogn";

const Nemandi: React.FC = () => {
  let items = ["Um okkur", "Hafðu samband", "Útskráning"];
  let linkid = ["#umOkkur", "#hafduSamband", "/"];

  const location = useLocation();
  const user = location.state as { username: string } | undefined;
  const username = user?.username;

  return (
    <React.Fragment>
      <Navbar items={items} heading="Leikur að lesa" linkid={linkid} />

      <h1 className="welcome">Velkomin {user?.username}</h1>

      <div className="books">
        <h1>Mínar bækur:</h1>
        <NemandiGogn username={username || "Einhvað fór úrskeiðis"} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Nemandi;
