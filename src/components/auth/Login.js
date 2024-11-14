import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emptyFilled, setEmptyFilled] = useState("");
  const [emptyFilledEmail, setEmptyFilledEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyFilled("");

    if (!password) {
      setEmptyFilled("Please enter a password");
      return;
    } else if (!email) {
      setEmptyFilledEmail("Please enter a email");
      return;
    }

    await axios
      .post(`${baseUrl}/api/user/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const handlePasswordBlur = () => {
    if (!password && !email) {
      setEmptyFilled("Please enter a password");
      setEmptyFilledEmail("Please enter a email");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return;
    }
  });
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-[#eae7e7]">
        <div className="w-96 p-6 bg-white rounded-md shadow-lg lg:max-w-lg h-[75%]">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="logo" className="w-28" />
          </div>

          <h2 className="text-left ml-6 text-2xl font-semibold mb-4">Login</h2>

          <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            {""}
            <div className="relative w-72">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmptyFilledEmail("");
                }}
                onBlur={handlePasswordBlur}
                className={`peer bg-transparent h-12 w-full rounded-lg border-2 ${
                  emptyFilled ? "border-red-500" : "border-gray-300"
                } text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]`}
                placeholder="Email address"
                required
              />
              {emptyFilledEmail && (
                <span className="text-[10px] text-red-500 ml-2">
                  {emptyFilledEmail}
                </span>
              )}
              <label
                htmlFor="email"
                className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
              >
                Email address
              </label>
            </div>

            <div className="relative w-72">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setEmptyFilled("");
                }}
                onBlur={handlePasswordBlur}
                className={`peer bg-transparent h-12 w-full rounded-lg border-2 ${
                  emptyFilled ? "border-red-500" : "border-gray-300"
                } text-gray-700 px-2 placeholder-transparent focus:outline-none focus:border-[#fe5e7f]`}
                placeholder="Password"
                required
              />
              {emptyFilled && (
                <span className="text-[10px] text-red-500 ml-2">
                  {emptyFilled}
                </span>
              )}
              <label
                htmlFor="password"
                className="absolute left-2 -top-3 text-gray-500 bg-white px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-72 py-2 bg-[#fe5e7f] text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              SIGN IN
            </button>
            {error && (
              <span className="text-[10px] text-red-500 text-center mt-2">
                {error}
              </span>
            )}
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Don't have an account?
              <a href="/register" className="text-[#fe5e7f] hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
      {isLoading && (
        <button type="button" class="bg-pink-400 ..." disabled>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Loading...
        </button>
      )}
    </>
  );
};

export default Login;
