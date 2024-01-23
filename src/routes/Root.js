import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />

      {/* <Footer /> */}
    </>
  );
}
