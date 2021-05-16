import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, useEffect, useState } from "react";
import MainContent from "./components/MainContent/MainContent";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { fireAuth } from "./Firebase/FirebaseAuthentication";

export const UserContext = createContext({});

function App() {
  const [activeForm, setActiveForm] = useState("add");
  const [toEditTodo, setToEditTodo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    fireAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const url = `http://localhost:5000/todos/${userAuth.email}`;
        axios
          .get(url)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });

        setIsLoggedIn(true);
        setLoggedInUser(userAuth);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser({});
      }
      setPageLoading(false);
    });
  }, []);
  console.log(loggedInUser);

  const reloadData = () => {
    if (isLoggedIn) {
      const url = `http://localhost:5000/todos/${loggedInUser?.email}`;
      axios
        .get(url)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return pageLoading ? (
    <div>Loading</div>
  ) : (
    <UserContext.Provider
      value={{
        activeForm,
        setActiveForm,
        toEditTodo,
        setToEditTodo,
        data,
        setData,
        reloadData,
        isLoggedIn,
        setIsLoggedIn,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      <NavigationBar />
      <MainContent />
    </UserContext.Provider>
  );
}

export default App;
