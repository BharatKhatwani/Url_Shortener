import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
// import { signup } from "../Components/AuthContext.jsx";
 const signupUrl = import.meta.env.VITE_SIGNUP;

//  console.log("Signup URL:", signupUrl);

const Signup = () => {
  const  { signup  } = useAuth();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
//       console.log("Full signup response data:", data);
// console.log("data.token:", data.token);
      if (response.ok) {
          // localStorage.setItem('token', data.token);
          // signup(data.token);signup(data.accessToken);
signup(data.accessToken);
// console.log(data.accessToken)

          // console.log( signup(data.))
        setSuccessMsg("Account created successfully!");

        setTimeout(() => navigate("/home"), 1500);
      } else {
        setErrorMsg(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create Your Account 📝
        </h1>

        {errorMsg && (
          <div className="mb-4 text-red-400 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 text-green-400 text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-2 rounded-lg transition duration-300`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
