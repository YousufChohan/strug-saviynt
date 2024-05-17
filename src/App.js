// Import your action creator
import React from "react";
import { useSelector } from "react-redux";
import backgroundImage from "./assets/images/pole-bg22.jpg";
import CustomerCard from "./components/CustomerCard";
import SidebarButton from "./components/SidebarButton";
import CustomerIcon from "./assets/images/customers.png";

export default function App() {
  const customerss = [
    { link: "/", text: "CUSTOMERS", image: CustomerIcon },
    { link: "/", text: "DEALERS", image: CustomerIcon },
    { link: "/", text: "VENDORS", image: CustomerIcon },
    { link: "/", text: "EMPLOYEES", image: CustomerIcon },
  ];
  // const { userData } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  // // console.log("customers log 2:", customers);

  // useEffect(() => {
  //   dispatch(fetchCustomers());
  // }, [dispatch]);

  return (
    <>
      <section
        className="z-10 flex items-start flex-col relative bg-[#f3f3f3] min-h-52 w-full gap-6"
        // style={{
        //   backgroundImage: `url(${backgroundImage2})`,
        // }}
      >
        <h1 className="text-black w-full md:text-5xl text-2xl md:text-left text-center font-bold bg-white md:p-12 p-5">
          CUSTOMERS
        </h1>
        <button className="flex gap-4 items-center bg-gradient-to-r from-[#57BC90] to-primary md:m-12 m-3 text-white font-semibold font-lato px-6 py-3 rounded-lg">
          <p>+</p>
          <p>ADD NEW CUSTOMER</p>
        </button>
        <section className="flex p-3 items-center bg-[#c5e3d5] md:ml-12 md:w-11/12 w-full rounded-lg gap-4 justify-between">
          <button className="font-lato font-bold text-primary md:text-xl text-lg">
            Sort By{">"}
          </button>
          <button className="font-lato font-bold text-primary md:text-xl text-lg">
            Username
          </button>
          <button className="font-lato font-bold text-primary md:text-xl text-lg">
            Customer Name
          </button>
          <button className="font-lato font-bold text-primary md:text-xl text-lg">
            Email
          </button>

          <button className="w-12"></button>
        </section>
        <div className="md:mx-12 mx-3 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-1 gap-3 md:w-11/12 w-full">
          {customerss.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
        </div>
      </section>
    </>
  );
}
