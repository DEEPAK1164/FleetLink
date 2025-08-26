import React, { useState } from "react";
import { motion } from "framer-motion";

const Registration = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Capacity: "",
    Tyres: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.Name,
          Capacity: parseInt(formData.Capacity),
          Tyres: parseInt(formData.Tyres),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${data.message}`);
        setFormData({ Name: "", Capacity: "", Tyres: "" });
      } else {
        setMessage("Failed to register vehicle");
      }
    } catch (err) {
      console.log("Error:", err);
      setMessage("Error registering vehicle.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-yellow-100 rounded-2xl shadow-lg border border-yellow-200"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold mb-6 text-center text-yellow-700"
        >
          Vehicle Registration
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="label">
              <span className="label-text text-yellow-800">Name</span>
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="label">
              <span className="label-text text-yellow-800">Capacity (kg)</span>
            </label>
            <input
              type="number"
              name="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
              className="input input-bordered w-full bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="label">
              <span className="label-text text-yellow-800">Tyres</span>
            </label>
            <input
              type="number"
              name="Tyres"
              value={formData.Tyres}
              onChange={handleChange}
              className="input input-bordered w-full bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full shadow-md"
          >
            Register
          </motion.button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 alert bg-yellow-200 text-green-900 text-sm justify-center border border-yellow-300"
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Registration;
