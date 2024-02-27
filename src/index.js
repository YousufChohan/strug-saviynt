import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Error from "./routes/Error";
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Events from "./routes/events/Events";
import EventDetails from "./routes/events/EventDetails";
import AddEvent from "./routes/events/AddEvent";
import EditEvent from "./routes/events/EditEvent";
import CheckoutSuccess from "./routes/events/CheckoutSuccess";
import Check from "./routes/check";
import About from "./routes/About";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/addevent",
        element: <AddEvent />,
      },
      {
        path: "/editevent/:id",
        element: <EditEvent />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/cricket",
        element: <Check />,
      },
      {
        path: "/about",
        element: <About />,
      },
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
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
