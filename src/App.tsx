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
import MarketPlace from "./pages/market/Index";
import FeedbackAndReport from "./pages/feedback/FeedbackAndReport";
import Favourites from "./pages/dashboard/Favourites";
import SingleRoutePage from "./pages/singleRoute/SingleRoutePage";
import Notification from "./pages/notifications/Notification";
import { Notifications } from "react-push-notification";
import NewMarketTicket from "./pages/create/NewMarketTicket";
import SingleCommutePage from "./pages/market/commuteId/SingleCommutePage";
import Schedule from "./pages/schedule/Schedule";
import { language } from "./service/languages/languages";
import Error404 from "./components/error/Error404";

function App() {
  language("eng");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      errorElement: <Error404 />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
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
          path: "/schedule",
          element: <Schedule />,
        },
        {
          path: "/market",
          element: <MarketPlace />,
        },
        {
          path: "/review-ticket/:commuteId",
          element: <SingleCommutePage />,
        },
        {
          path: "/market/create",
          element: <NewMarketTicket />,
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
