import React from "react";

const DotSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="w-2.5 h-2.5 bg-white rounded-full animate-bounce mx-1"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2.5 h-2.5 bg-white rounded-full animate-bounce mx-1"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2.5 h-2.5 bg-white rounded-full animate-bounce mx-1"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default DotSpinner;
