import React, { useState } from "react";
import MeetingList from "./MeetingsList";
// import { navigate } from "@reach/router";

function Meetings({ addMeeting, meetings, userID, firebase }) {
  const [meetingName, setMeetingName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    addMeeting(meetingName);
    setMeetingName("");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="font-weight-light">Add a meetingName</h1>
          <div className="card bg-light">
            <div className="card-body text-center">
              <form className="formgroup" onSubmit={handleSubmit}>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    name="meetingNameName"
                    value={meetingName}
                    onChange={e => setMeetingName(e.target.value)}
                    placeholder="meeting name"
                    aria-describedby="buttonAdd"
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-sm btn-info"
                      id="buttonAdd"
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-11 col-md-6 text-center">
          <div className="card border-top-0 rounded-0">
            {meetings && meetings.length ? (
              <div className="card-body py-2">
                <h4 className="card-title font-weight-light m-0">
                  Your Meetings
                </h4>
              </div>
            ) : null}
            {meetings && (
              <div className="list-group list-group-flush">
                <MeetingList
                  meetings={meetings}
                  userID={userID}
                  firebase={firebase}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetings;
