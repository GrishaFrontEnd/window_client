import React from "react";

interface IProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyButton: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <button
      className="text-white text-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
