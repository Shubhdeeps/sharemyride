import "./styles/custom.css";
import "./styles/globals.css";
import "./styles/cards.css";
import "./styles/topsidebar.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import NewRide from "./pages/create/NewRide";
import NewPassenger from "./pages/create/NewPassenger";
import ReviewRidePost from "./pages/singlePost/SingleRidePost";
import SinglePassengerPost from "./pages/singlePost/SinglePassengerPost";
import Profile from "./pages/profile/Index";
import FeedbackAndReport from "./pages/feedback/FeedbackAndReport";
import Index from "./pages/Index";
import Favourites from "./pages/dashboard/Favourites";
import SingleRoutePage from "./pages/singleRoute/SingleRoutePage";
import Notification from "./pages/notifications/Notification";
import { Notifications } from "react-push-notification";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      errorElement: <div>Error</div>,
      children: [
        {
          path: "/",
          element: <Index />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/favourites",
          element: <Favourites />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/feedback-report",
          element: <FeedbackAndReport />,
        },
        {
          path: "route/:routeId",
          element: <SingleRoutePage />,
        },
        {
          path: "/route/:routeId/new-ride",
          element: <NewRide />,
        },
        {
          path: "/review-ride/:rideId",
          element: <ReviewRidePost />, //ride ticket with its comments shown here
        },
        {
          path: "/route/:routeId/new-passenger",
          element: <NewPassenger />,
        },
        {
          path: "/review-passenger/:passengerId",
          element: <SinglePassengerPost />, // single passenger with comments
        },
        {
          path: "/notification",
          element: <Notification />, // single passenger with comments
        },
      ],
    },
  ]);
  return (
    <>
      <Notifications />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
