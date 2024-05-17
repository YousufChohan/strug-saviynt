import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";

export default function Root() {
  return (
    <>
      <section className="md:flex w-full overflow-hidden">
        <Header />
        <div className="flex-col w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
}
