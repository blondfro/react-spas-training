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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        setUser(FBUser.displayName);
        setDisplayName(FBUser.displayName);
        setUserID(FBUser.uid);
      }
    });

    // const ref = firebase.database().ref("user");
    // ref.on("value", snapshot => {
    //   let FBUser = snapshot.val();
    //   setUser(FBUser);
    // });
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

  return (
    <div>
      <Navigation user={user} />
      {user && <Welcome userName={displayName} />}
      <Router>
        <Home path="/" user={displayName} />
        <Login path="/login" />
        <Meetings path="/meetings" />
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
