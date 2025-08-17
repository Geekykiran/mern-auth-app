import React, { useState } from "react";
import axios from "../axios/index.js";
import { Link } from "react-router-dom";

const Login = () => {
  let [login, setLogin] = useState({
    email: "",
    password: "",
  });

  let [message, setMessage] = useState("");

  let handleChange = (e) => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/login", login);
      setMessage("Login successful!");
      console.log(res.data);

      // if backend sends token, save it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setLogin({ email: "", password: "" });
    } catch (err) {
      setMessage("Invalid email or password.");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {message && (
          <p className="text-center text-sm text-red-600 mb-3">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
