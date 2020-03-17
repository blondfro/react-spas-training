import React from "react";
import { Link } from "@reach/router";

function Welcome({ user, ...props }) {
  return (
    <div className="text-center mt-4">
      <span className="font-weight-bold pl-1">Welcome {user}</span>,
      <Link to="/" className="font-weight-bold text-primary pl-1">
        Log Out
      </Link>
    </div>
  );
}

export default Welcome;
