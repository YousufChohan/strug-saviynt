import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col bg-slate-500 items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50">
      <h1 className="text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] ">
        Page Not Found{" "}
      </h1>
      <p className="text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
        The page you are trying to reach is not found on this server. Please
        check the URL and try again.
      </p>
    </div>
  );
};

export default Error;
