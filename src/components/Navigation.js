import React from "react";
import { Link } from "@reach/router";
import { FaUsers } from "react-icons/all";

function Navigation({ user, logoutUser, ...props }) {
  return (
    <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <FaUsers className="mr-1" /> Meeting Log
        </Link>
        <div className="navbar-nav ml-auto">
          {user && (
            <Link to="/meetings" className="nav-item nav-link">
              meetings
            </Link>
          )}
          {!user && (
            <Link to="/login" className="nav-item nav-link">
              log in
            </Link>
          )}
          {!user && (
            <Link to="/register" className="nav-item nav-link">
              register
            </Link>
          )}
          {user && (
            <Link
              to="/login"
              className="nav-item nav-link"
              onClick={e => logoutUser(e)}
            >
              log out
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
