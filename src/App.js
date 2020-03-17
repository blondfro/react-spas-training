import React, { useEffect, useState } from "react";
import { navigate, Router } from "@reach/router";
import firebase from "./components/Firebase";

import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [howManyMeetings, setHowManyMeetings] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        setUser(FBUser.displayName);
        setDisplayName(FBUser.displayName);
        setUserID(FBUser.uid);

        const meetingsRef = firebase.database().ref("meetings/" + FBUser.uid);

        meetingsRef.on("value", snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          setMeetings(meetingsList);
          setHowManyMeetings(meetingsList.length);
        });
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      })
        .then(() => {
          setUser(FBUser);
          setDisplayName(FBUser.displayName);
          setUserID(FBUser.uid);
        })
        .catch(error => {
          error !== null ? console.log(error.message) : console.log("fine");
        });
      navigate("/meetings");
    });
  };

  const logoutUser = event => {
    event.preventDefault();
    setUser(null);
    setDisplayName(null);
    setUserID(null);

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  const addMeeting = meetingName => {
    const ref = firebase
      .database()
      .ref(`meetings/${userID}`)
      .ref.push({ meetingName: meetingName });
  };

  return (
    <div>
      <Navigation user={user} logoutUser={logoutUser} />
      {user && <Welcome userName={displayName} logoutUser={logoutUser} />}
      <Router>
        <Home path="/" user={displayName} />
        <Login path="/login" firebase={firebase} registerUser={registerUser} />
        <Meetings
          path="/meetings"
          addMeeting={addMeeting}
          meetings={meetings}
        />
        <Register
          path="/register"
          firebase={firebase}
          registerUser={registerUser}
        />
      </Router>
    </div>
  );
}

export default App;
