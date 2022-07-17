import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { hotelById, diffDays, isAlreadyBooked } from "../actions/hotel";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  // const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadHotel();
  }, []);

  // useEffect(() => {
  //   if (auth && auth.token) {
  //     isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
  //       // console.log(res);
  //       if (res.data.ok) setAlreadyBooked(true);
  //     });
  //   }
  // }, []);

  const loadHotel = async () => {
    let res = await hotelById(match.params.hotelId);
    setHotel(res.data.body);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.idToken) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    // console.log(auth.token, match.params.hotelId);
    // let res = await getSessionId(auth.token, match.params.hotelId);
    // console.log("get sessionid resposne", res.data.sessionId);
    // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    // stripe
    //   .redirectToCheckout({
    //     sessionId: res.data.sessionId,
    //   })
    //   .then((result) => console.log(result));
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img
              src={hotel.image}
              alt={hotel.title}
              className="img img-fluid m-2"
            />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.description}</b>
            <p
              className="alert alert-info mt-3"
              style={{ maxWidth: "200px", textAlign: "center" }}
            >
              ${hotel.dailyRate}
            </p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            {/* <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i> */}
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || !auth}
            >
              {loading
                ? "Loading..."
                : // : alreadyBooked
                // ? "Already Booked"
                auth && auth.idToken
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;