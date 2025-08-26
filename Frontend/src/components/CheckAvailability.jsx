import React from "react";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../Utils/AppSlice";
import { useNavigate } from "react-router";

const CheckAvailability = () => {
  const [formData, setFormData] = React.useState({
    Capacity: "",
    FromPincode: "",
    ToPincode: "",
    DateTime: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const localDate = new Date(formData.DateTime);
    const utcDate = localDate.toISOString();

    try {
      const response = await fetch(
        `http://localhost:3000/api/vehicles/available?capacityRequired=${formData.Capacity}&fromPincode=${formData.FromPincode}&toPinCode=${formData.ToPincode}&startTime=${utcDate}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      console.log("data->", data);
      dispatch(
        addVehicle({
          vehicle: data,
          startTime: formData.DateTime,
          toPincode: formData.ToPincode,
          fromPincode: formData.FromPincode,
          estimatedTime: data.estimatedTime,
        })
      );

      navigate("/bookVehicle");
    } catch (err) {
      console.log("Availability check failed:", err);
      alert("Error checking availability. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <div className="card w-full max-w-md shadow-xl bg-yellow-100 border border-yellow-200 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
          Check Availability
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Capacity */}
          <div className="flex flex-col space-y-2">
            <label className="text-yellow-800 font-medium">Capacity Required (kg)</label>
            <input
              type="number"
              name="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
              className="input input-bordered bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400 w-full"
              required
            />
          </div>

          {/* From Pincode */}
          <div className="flex flex-col space-y-2">
            <label className="text-yellow-800 font-medium">From Pincode</label>
            <input
              type="text"
              name="FromPincode"
              value={formData.FromPincode}
              onChange={handleChange}
              className="input input-bordered bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400 w-full"
              required
            />
          </div>

          {/* To Pincode */}
          <div className="flex flex-col space-y-2">
            <label className="text-yellow-800 font-medium">To Pincode</label>
            <input
              type="text"
              name="ToPincode"
              value={formData.ToPincode}
              onChange={handleChange}
              className="input input-bordered bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400 w-full"
              required
            />
          </div>

          {/* Start Date & Time */}
          <div className="flex flex-col space-y-2">
            <label className="text-yellow-800 font-medium">Start Date & Time</label>
            <input
              type="datetime-local"
              name="DateTime"
              value={formData.DateTime}
              onChange={handleChange}
              className="input input-bordered bg-white border-yellow-300 focus:ring-2 focus:ring-yellow-400 w-full"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full shadow-md"
          >
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckAvailability;
