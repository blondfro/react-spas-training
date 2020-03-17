import React, { useEffect, useState } from "react";
import AttendeesList from "./AttendeesList";

function Attendees({ adminUser, firebase, userID, meetingID, ...props }) {
  const [displayAttendees, setDisplayAttendees] = useState([]);

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
          attendeeEmail: attendees[attendee].attendeeEmail
        });
      }
      setDisplayAttendees(attendeesList);
    });
  });

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="font-weight-light text-center">Attendees</h1>
        </div>
      </div>
      <AttendeesList
        userID={userID}
        adminUser={adminUser}
        meetingID={meetingID}
        attendees={displayAttendees}
        firebase={firebase}
      />
    </div>
  );
}

export default Attendees;
