import { useState, useEffect } from "react";
import { allTours } from "../actions/hotel";

import TourCard from "../components/cards/TourCard";

const Tour = () => {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    loadAllTours();
  }, []);

  const loadAllTours = async () => {
    let res = await allTours();
    setTour(res.data.body);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Tour Packages</h1>
      </div>
      {/* <div className="col">
        <br />
        <Search />
      </div> */}
      <div className="container-fluid">
        <br />
        {tour.map((m) => (
          <TourCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
};

export default Tour;
