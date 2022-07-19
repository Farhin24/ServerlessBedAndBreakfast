import React from "react";
import axios from "axios";
import { useState } from "react";

function Feedback() {
  const [feedback, setfeedback] = useState("");

  const onSubmit = (event) => {
    const feedbackobj = { feedback_desc: feedback };
    event.preventDefault();
    axios
      .post(
        "https://us-central1-serverlesbandb.cloudfunctions.net/feedbacksentimentanalyzer",
        feedbackobj
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Your Feedback</h1>
      </div>
      <form onSubmit={onSubmit}>
        <span className="formtext"></span>
        <input
          type="text"
          onChange={(e) => {
            setfeedback(e.target.value);
          }}
          value={feedback}
          placeholder="Enter feedback"
          required
          name="feedback"
        />
        <button>submit!</button>
      </form>
    </>
  );
}

export default Feedback;
