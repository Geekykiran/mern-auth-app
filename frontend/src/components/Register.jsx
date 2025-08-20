import React, { useState } from "react";
import axios from "../axios/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";

const Register = () => {
  let navigate = useNavigate()
  let { setUser, setToken } = useAuth();
  let [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [message, setMessage] = useState("");

  let handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend check
    if (signup.password !== signup.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // NOTE: use signup object directly, not spread as separate args
      let res = await axios.post("/register", signup);

      setMessage("Registration successful!");
      console.log(res.data);

      let {username, email, token} = res.data
      setUser({username, email})
      setToken(token)
      navigate('/home')

      setSignup({ username: "", email: "", password: "", confirmPassword: "" });

    } catch (err) {
      console.error(err);

      // Handle backend validation error (mongoose)
      if (err.response && err.response.data && err.response.data.errors) {
        let backendError = err.response.data.errors;

        // Specific confirmPassword validation error
        if (backendError.confirmPassword) {
          setMessage(backendError.confirmPassword.message);
        } else if (backendError.password) {
          setMessage(backendError.password.message);
        } else {
          // Generic fallback
          setMessage("Registration failed. Try again.");
        }
      } else if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {message && (
          <p className="text-center text-sm text-red-600 mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={signup.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signup.email}
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
              value={signup.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={signup.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;