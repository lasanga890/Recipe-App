import React, { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conformPassword !== password) {
      setPasswordMatch(false);
    } else {
      await axios
        .post(`${baseUrl}/api/user/register`, {
          firstName,
          lastName,
          email,
          phone,
          password,
          conformPassword,
        })
        .then((response) => {
          navigate("/", { replace: true });
        })
        .catch(() => {
          console.log("error");
        });
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#eae7e7] ">
      <div className="w-[38rem] p-6 bg-white rounded-md shadow-lg px-14 h-[75%]">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-28" />
        </div>

        <h2 className="text-left text-2xl font-semibold mb-4">Register</h2>

        <form className="grid grid-cols-2 gap-4  " onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="peer bg-transparent h-12 w-full rounded-lg border-2 border-gray-300 text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]"
              placeholder="First Name"
              required
            />
            <label
              htmlFor="firstName"
              className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
            >
              First Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="peer bg-transparent h-12 w-full rounded-lg border-2 border-gray-300 text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]"
              placeholder="Last Name"
              required
            />
            <label
              htmlFor="lastName"
              className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
            >
              Last Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="peer bg-transparent h-12 w-full rounded-lg border-2 border-gray-300 text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="peer bg-transparent h-12 w-full rounded-lg border-2 border-gray-300 text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]"
              placeholder="Phone Number"
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
            >
              Phone Number
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="peer bg-transparent h-12 w-full rounded-lg border-2 border-gray-300 text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={conformPassword}
              onChange={(e) => {
                setConformPassword(e.target.value);
              }}
              className={`peer bg-transparent h-12 w-full rounded-lg border-2 px-2 placeholder-transparent focus:outline-none ${
                passwordMatch
                  ? "border-gray-300 focus:border-[#fe5e7f]"
                  : "border-red-500 focus:border-red-500"
              } text-gray-700`}
              placeholder="Confirm Password"
              required
            />
            {!passwordMatch && (
              <span className="text-[10px] text-red-500 ml-2">
                do not match Conform password
              </span>
            )}

            <label
              htmlFor="confirmPassword"
              className={`absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm ${
                passwordMatch
                  ? "border-gray-300 focus:border-[#fe5e7f] "
                  : "border-red-500 focus:border-red-500 text-red-500"
              }`}
            >
              Confirm Password
            </label>
          </div>

          <div className="col-span-2 mt-1">
            <button
              type="submit"
              className="w-36 py-2 bg-[#fe5e7f] text-white rounded-lg hover:bg-[#fe5e7f] transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Already have an account?
            <a href="/" className="text-[#fe5e7f] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
