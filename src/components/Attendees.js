import React, { useEffect, useState } from "react";
import AttendeesList from "./AttendeesList";

function Attendees({ adminUser, firebase, userID, meetingID, ...props }) {
  const [displayAttendees, setDisplayAttendees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttendees, setFilteredAttendees] = useState([]);

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`/meetings/${userID}/${meetingID}/attendees`);
    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];

      for (let attendee in attendees) {
        attendeesList.push({
          attendeeID: attendee,
          attendeeName: attendees[attendee].attendeeName,
          attendeeEmail: attendees[attendee].attendeeEmail,
          star: attendees[attendee].star
        });
      }
      setDisplayAttendees(attendeesList);
      setFilteredAttendees(attendeesList);
    });
  }, []);

  useEffect(() => {
    let filtered = displayAttendees.filter(
      item =>
        item.attendeeName.toLowerCase().match(searchQuery.toLowerCase()) && true
    );

    setFilteredAttendees(filtered);
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="font-weight-light text-center">Attendees</h1>
          <div className="card bg-light mb-4">
            <div className="card-body text-center">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search Attendees"
                className="form-control"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <AttendeesList
        userID={userID}
        adminUser={adminUser}
        meetingID={meetingID}
        attendees={filteredAttendees}
        firebase={firebase}
      />
    </div>
  );
}

export default Attendees;
