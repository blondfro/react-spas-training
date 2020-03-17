import React from "react";

function Welcome({ user, ...props }) {
  return (
    <div className="text-center mt-4">
      <span className="font-weight-bold pl-1">Welcome, {user}</span>,
      <a href="/" className="font-weight-bold text-primary pl-1">
        Log Out
      </a>
    </div>
  );
}

export default Welcome;
