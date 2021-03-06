import React from "react";
import { GoTrashcan, FaLink, FaUsers, GoListOrdered } from "react-icons/all";
import { navigate } from "@reach/router";

function MeetingList({ meetings, userID, firebase }) {
  const deleteMeeting = (event, meeting) => {
    event.preventDefault();

    const ref = firebase.database().ref(`meetings/${userID}/${meeting}`);
    ref.remove();
  };

  return (
    <div>
      {meetings.map(meeting => (
        <div key={meeting.meetingID} className="list-group-item d-flex">
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Message"
              onClick={e => {
                deleteMeeting(e, meeting.meetingID);
              }}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Checkin"
              onClick={() => {
                navigate(`/checkin/${userID}/${meeting.meetingID}`);
              }}
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={() => {
                navigate(`/attendees/${userID}/${meeting.meetingID}`);
              }}
            >
              <GoListOrdered />
            </button>
          </section>

          <section className="pl-3 text-left align-self-center">
            {meeting.meetingName}
          </section>
        </div>
      ))}
    </div>
  );
}

export default MeetingList;
