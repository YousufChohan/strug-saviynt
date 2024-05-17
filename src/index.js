import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Error from "./routes/Error";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import AddCustomer from "./routes/CRUD/AddCustomer";
import EditCustomer from "./routes/CRUD/EditCustomer";
import DeleteCustomer from "./routes/CRUD/DeleteCustomer";

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
        path: "/addcustomer",
        element: <AddCustomer />,
      },
      {
        path: "/editcustomer/:id",
        element: <EditCustomer />,
      },
      {
        path: "/deletecustomer/:id",
        element: <DeleteCustomer />,
      },
    ],
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
