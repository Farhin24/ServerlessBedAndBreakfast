import { useState, useEffect } from "react";
import { allMenu } from "../actions/hotel";
import MenuCard from "../components/cards/MenuCard";
import { useSelector } from "react-redux";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    loadAllmenu();
  }, []);

  const loadAllmenu = async () => {
    let res = await allMenu();
    setMenu(res.data.body);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Menu</h1>
      </div>
      {/* <div className="col">
        <br />
        <Search />
      </div> */}
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {menu.map((m) => (
          <MenuCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
};

export default Menu;
