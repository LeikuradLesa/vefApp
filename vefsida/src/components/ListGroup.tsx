import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div className="App">
        <button
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          Hover over me!
        </button>
        {isShown && (
          <div>
            {items.length === 0 && <p>No items</p>}
            <ul className="list-group">
              {items.map((item, index) => (
                <li
                  className={
                    selectedIndex === index
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  key={item}
                  onClick={() => {
                    setSelectedIndex(index);
                    onSelectItem(item);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h1>{heading}</h1>
    </>
  );
}

export default ListGroup;
