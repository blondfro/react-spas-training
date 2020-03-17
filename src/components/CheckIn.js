import React, { useState } from "react";
import { navigate } from "@reach/router";

function CheckIn({ userID, meetingID, firebase, ...props }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${userID}/${meetingID}/attendees`);
    ref.push({
      attendeeName: userName,
      attendeeEmail: email,
      star: false
    });
    navigate(`/attendees/${userID}/${meetingID}`);
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Check in</h3>
                <section className="form-group">
                  <label
                    className="form-control-label sr-only"
                    htmlFor="displayName"
                  >
                    Name
                  </label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                    placeholder="Name"
                  />
                </section>
                <section className="form-group">
                  <label className="form-control-label sr-only" htmlFor="Email">
                    Email
                  </label>
                  <input
                    required
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Email"
                  />
                </section>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Check in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckIn;
