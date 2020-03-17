import React from "react";
import { GoStar, GoTrashcan, GoMail } from "react-icons/all";
import { navigate } from "@reach/router";

function AttendeesList({ userID, adminUser, meetingID, attendees, firebase }) {
  const admin = adminUser === userID ? true : false;

  const deleteAttendee = (event, meeting, attendee) => {
    event.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}`);
    ref.remove();
  };

  const toggleStar = (event, star, meeting, attendee) => {
    event.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}/star`);
    if (star === undefined) {
      ref.set(true);
    } else ref.set(!star);
  };

  return (
    <div className="row justify-content-center">
      {attendees.map(attendee => (
        <div
          key={attendee.attendeeID}
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        >
          <div className="card ">
            <div
              className={
                "card-body px-3 py-2 d-flex align-items-center" +
                (admin ? "" : "justify-content-center")
              }
            >
              {admin && (
                <div className="btn-group pr-2">
                  <button
                    className={
                      "btn btn-sm " +
                      (attendee.star ? "btn-info" : "btn-outline-secondary")
                    }
                    title="Add Star"
                    onClick={e =>
                      toggleStar(
                        e,
                        attendee.star,
                        meetingID,
                        attendee.attendeeID
                      )
                    }
                  >
                    <GoStar />
                  </button>
                  <a
                    href={`mailto:${attendee.attendeeEmail}`}
                    className="btn btn-sm btn-outline-secondary"
                    title="Mail Attendee"
                  >
                    <GoMail />
                  </a>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Delete Attendee"
                    onClick={e =>
                      deleteAttendee(e, meetingID, attendee.attendeeID)
                    }
                  >
                    <GoTrashcan />
                  </button>
                </div>
              )}
              <div>{attendee.attendeeName}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttendeesList;
