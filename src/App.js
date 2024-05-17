import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "./redux/features/CustomerSlice";
import CustomerCard from "./components/CustomerCard";
import { Link } from "react-router-dom";
import { RiExpandUpDownFill } from "react-icons/ri";

export default function App() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [sortedCustomers, setSortedCustomers] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    setSortedCustomers(customers);
  }, [customers]);

  const sortByUsername = () => {
    const sorted = [...sortedCustomers].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setSortedCustomers(sorted);
  };

  const sortByCustomerName = () => {
    const sorted = [...sortedCustomers].sort((a, b) =>
      a.customerName.localeCompare(b.customerName)
    );
    setSortedCustomers(sorted);
  };

  const sortByEmail = () => {
    const sorted = [...sortedCustomers].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    setSortedCustomers(sorted);
  };

  return (
    <>
      <section className="z-10 flex items-start flex-col relative bg-[#f3f3f3] min-h-52 w-full gap-6">
        <h1 className="text-black w-full md:text-5xl text-2xl md:text-left text-center font-bold bg-white md:p-12 p-5">
          CUSTOMERS
        </h1>
        <Link
          to="/addcustomer"
          className="flex gap-4 items-center bg-gradient-to-r from-[#57BC90] to-primary md:m-12 m-3 text-white font-semibold font-lato px-6 py-3 rounded-lg"
        >
          <p>+</p>
          <p>ADD NEW CUSTOMER</p>
        </Link>
        <section className="flex p-3 items-center bg-[#c5e3d5] md:ml-12 md:w-11/12 w-full rounded-lg gap-4 justify-between">
          <button className="font-lato font-bold text-primary md:text-xl text-lg">
            Sort By{">"}
          </button>
          <button
            onClick={sortByUsername}
            className="flex justify-center items-center font-lato font-bold text-primary md:text-xl text-lg"
          >
            Username
            <RiExpandUpDownFill />
          </button>
          <button
            onClick={sortByCustomerName}
            className="flex justify-center items-center font-lato font-bold text-primary md:text-xl text-lg"
          >
            Customer Name
            <RiExpandUpDownFill />
          </button>
          <button
            onClick={sortByEmail}
            className="flex justify-center items-center font-lato font-bold text-primary md:text-xl text-lg"
          >
            Email
            <RiExpandUpDownFill />
          </button>
          <button className="w-12"></button>
        </section>
        <div className="md:mx-12 mx-3 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-1 gap-3 md:w-11/12 w-full">
          {sortedCustomers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
        </div>
      </section>
    </>
  );
}
