import React, { useContext } from "react";
import { UserContext } from "../../App";
import { signOut } from "../../Firebase/FirebaseAuthentication";

const NavigationBar = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Awesome ToDo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {isLoggedIn && (
              <li className="nav-item">
                <p className="nav-link m-0" href="#">
                  {loggedInUser.displayName}
                </p>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  onClick={signOut}
                  className="nav-link btn btn-light"
                  href="#"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
