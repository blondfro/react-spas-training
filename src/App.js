import React, { useState } from "react";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState("Ray");

  return <Home user={user} />;
}

export default App;
