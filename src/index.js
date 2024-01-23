import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/Error";
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
// import { Fundraising } from "./Routes/Fundraising";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import Signup from "./Routes/Auth/Signup";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      // {
      //   path: "/fundraising",
      //   element: <Fundraising />,
      // },
    ],
  },
  {
    element: <Signup />,
    path: "/signup",
    errorElement: <Error />,
  },
  {
    element: <Login />,
    path: "/login",
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
