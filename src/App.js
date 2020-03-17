import React, { useState } from "react";
import Home from "./components/Home";
import Welcome from "./components/Welcome";

function App() {
  const [user, setUser] = useState("Ray");

  return (
    <div>
      {user && <Welcome user={user} />}
      <Home user={user} />
    </div>
  );
}

export default App;
