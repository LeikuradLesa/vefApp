import { useState } from "react";
import "./navbar.css";
import Dark_logo from "../assets/dark_logo_png.png";
interface Props {
  items: string[];
  linkid: string[];
  heading: string;
}

const Navbar = ({ linkid, items, heading }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);

    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
  };

  return (
    <>
      <div className="navbar_items">
        <nav>
          <h1 className="heading">{heading}</h1>
          <a href="/">
            <img src={Dark_logo} alt="logo" />
          </a>
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
          </div>
        </nav>
      </div>
      <div className={menu_class}>
        {items.length === 0 && <p>No items</p>}
        <ul className="list-group">
          {items.map((item, index) => (
            <a href={linkid[index]} onClick={() => setSelectedIndex(index)}>
              <li
                className={
                  selectedIndex === index
                    ? "list-group-item list-group-item-dark"
                    : "list-group-item"
                }
                key={item}
                onMouseEnter={() => {
                  setSelectedIndex(index);
                }}
              >
                {item}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
