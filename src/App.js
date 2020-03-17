import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import firebase from "./components/Firebase";

import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import Register from "./components/Registration";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const ref = firebase.database().ref("user");
    ref.on("value", snapshot => {
      let FBUser = snapshot.val();
      setUser(FBUser);
    });
  });

  return (
    <div>
      <Navigation user={user} />
      {user && <Welcome user={user} />}
      <Router>
        <Home path="/" user={user} />
        <Login path="/login" />
        <Meetings path="/meetings" />
        <Register path="/registration" />
      </Router>
    </div>
  );
}

export default App;
