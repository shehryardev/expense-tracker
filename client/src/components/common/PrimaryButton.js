import React from "react";

const PrimaryButton = ({
  children,
  onClick = () => {},
  type = "button",
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-black hover:bg-gray-900 text-[#e6e6e6] font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
    {...props}
  >
    <>{children}</>
  </button>
);

export default PrimaryButton;
