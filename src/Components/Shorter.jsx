import React, { useState } from "react";
import { motion } from "framer-motion";
const HomeUrl = import.meta.env.VITE_HOME;

const Shorter = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
    setShortUrl("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");
    setError("");

    try {
      const res = await fetch(HomeUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();
      setShortUrl(data.shortUrl);
      setUrl("");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center px-4">
      <motion.div
        className="bg-[#1E293B]/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-xl border border-[#334155]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🔗 Shortify URL
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="w-full px-4 py-3 bg-[#1E293B] border border-[#334155] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base mb-4"
            value={url}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            } text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer`}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-400 text-center font-medium">{error}</p>
        )}

        {shortUrl && (
          <motion.div
            className="mt-6 bg-[#0F172A] border border-[#334155] p-4 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-cyan-300 font-semibold text-lg mb-1">✨ Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-cyan-400 underline break-words text-md"
            >
              {shortUrl}
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Shorter;
