import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import logo from "../assets/logo.png";
const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-white flex h-[5rem] w-full items-center overflow-hidden px-40 justify-between">
      <img src={logo} alt="Logo" className="w-[8rem]" />
      <div className="flex gap-12">
        <Link to="/dashboard">
          <p
            className={`text-lg ${
              currentPage === "home" ? "font-bold" : "font - normal"
            }`}
          >
            Home
          </p>
        </Link>
        <Link to="/favourite">
          <p
            className={`text-lg ${
              currentPage === "favourite" ? "font-bold" : "font - normal"
            }`}
          >
            Favourites
          </p>
        </Link>
      </div>

      <GoSignOut
        size={"2rem"}
        className="w-[2.5rem] cursor-pointer"
        onClick={() => logout()}
      />
    </div>
  );
};

export default Navbar;
