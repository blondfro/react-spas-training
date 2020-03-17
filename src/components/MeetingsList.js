import React from "react";

function MeetingList({ meetings }) {
  return (
    <div>
      {meetings.map(meeting => (
        <div key={meeting.meetingID} className="list-group-item d-flex">
          <section className="pl-3 text-left align-self-center">
            {meeting.meetingName}
          </section>
        </div>
      ))}
    </div>
  );
}

export default MeetingList;
