import React from "react";
import Logo from "../assets/images/logo.png";
import CustomerIcon from "../assets/images/customers.png";
import SidebarButton from "./SidebarButton";

const Header = () => {
  const buttons = [
    { link: "/", text: "CUSTOMERS", image: CustomerIcon },
    { link: "/", text: "DEALERS", image: CustomerIcon },
    { link: "/", text: "VENDORS", image: CustomerIcon },
    { link: "/", text: "EMPLOYEES", image: CustomerIcon },
  ];

  return (
    <>
      <div className="md:h-screen w-full md:w-3/12 md:rounded-r-[20px] bg-primary flex flex-col items-center md:py-6 p-2 md:px-4">
        <img src={Logo} alt="Logo" className="md:w-60 w-32 md:mb-10 mb-3" />
        <div className="flex w-3/4 md:w-full md:justify-start justify-around md:flex-col gap-3 flex-grow">
          {buttons.map((e, index) => (
            <SidebarButton
              key={index}
              link={buttons[index].link}
              text={buttons[index].text}
              image={buttons[index].image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
