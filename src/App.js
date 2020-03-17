import React, { useState } from "react";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";

function App() {
  const [user, setUser] = useState("James");

  return (
    <div>
      <Navigation user={user} />
      {user && <Welcome user={user} />}
      <Home user={user} />
    </div>
  );
}

export default App;
