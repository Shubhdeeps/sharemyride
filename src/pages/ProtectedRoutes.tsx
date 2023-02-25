/* eslint-disable */
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader";
import Header from "../components/navigationBars/Header";
import Sidebar from "../components/navigationBars/Sidebar";
import Layout from "../Layout";
import { auth } from "../service/firebase/firebaseConfig";
import { currentUserProfile } from "../store/store";
import Register from "./registration";

export const ProtectedRoutesFN = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sideBarFlex, setSideBarFlex] = useState(false);

  const [currUser, setCurrUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        currentUserProfile.value = user;
        setCurrUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCurrUser(null);
      }
    });
  }, [auth.currentUser]);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <>
      {!!currUser ? (
        <Layout>
          <Header setSideBarFlex={setSideBarFlex} sideBarFlex={sideBarFlex} />
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
