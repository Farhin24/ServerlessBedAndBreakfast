import React from "react";

const Visualizations = (props) => {
  return (
    <div>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/reporting/4c0f02d9-6bef-4f97-907c-206f5a8ccb8b/page/tEnnC"
          target="_blank"
        >
          Room Booking Visualizations
        </a>
      </button>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/reporting/477fa5da-97a1-4a26-bb7c-e9d7308550fb/page/tEnnC"
          target="_blank"
        >
          Meal Booking Visualizations
        </a>
      </button>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/reporting/e1a95f2e-860c-4193-8005-e1413afd366f/page/tEnnC"
          target="_blank"
        >
          Tour Booking Visualizations
        </a>
      </button>
    </div>
  );
};

export default Visualizations;
