/* eslint-disable */
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader";
import Header from "../components/navigationBars/Header";
import Sidebar from "../components/navigationBars/Sidebar";
import Layout from "../Layout";
import { auth } from "../service/firebaseConfig";
import Register from "./registration";

export const ProtectedRoutesFN = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sideBarFlex, setSideBarFlex] = useState(false);

  const [currUser, setCurrUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("state change");
      if (user) {
        setCurrUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCurrUser(null);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <>
      {currUser ? (
        <Layout>
          <Header
            setSideBarFlex={setSideBarFlex}
            sideBarFlex={sideBarFlex}
            displayName={currUser.displayName as string}
            photoURL={currUser.photoURL as string}
          />
          <Sidebar SetFlex={setSideBarFlex} sideBarFlex={sideBarFlex} />
          <Outlet />
        </Layout>
      ) : (
        <Layout>
          <Register />
        </Layout>
      )}
    </>
  );
};

export const ProtectedRoutes = React.memo(ProtectedRoutesFN);
