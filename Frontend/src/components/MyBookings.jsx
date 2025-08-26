import { useEffect, useState } from "react";

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(""); // custom message

  const customerId = "101"; // need real ID

  const fetchMyBookings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${customerId}`);
      const data = await response.json();

      if (!data.bookings || data.bookings.length === 0) {
        setErrorMsg("No bookings found for your account.");
        setMyBookings([]);
        return;
      }

      const filtered = data.bookings.filter((b) => b.booking !== null);
      if (filtered.length === 0) {
        setErrorMsg("No valid bookings found.");
      }
      setMyBookings(filtered);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setErrorMsg("Unable to load bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        alert("Booking cancelled successfully.");
        setMyBookings((prev) =>
          prev.filter((trip) => trip.booking._id !== bookingId)
        );
      } else {
        alert(result.message || "Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Something went wrong while cancelling.");
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-yellow-700">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">
        My Bookings
      </h2>

      {errorMsg ? (
        <p className="text-center text-yellow-600">{errorMsg}</p>
      ) : (
        <div className="grid gap-6">
          {myBookings.map((trip) => (
            <div
              key={trip.booking._id}
              className="card bg-yellow-50 shadow-md p-6 border border-yellow-200 rounded-xl"
            >
              <h3 className="text-xl text-yellow-800 font-semibold">
                {trip.booking.VehicleId?.Name}
              </h3>
              <ul className="mt-2 text-yellow-700">
                <li><b>From:</b> {trip.booking.fromPinCode}</li>
                <li><b>To:</b> {trip.booking.toPinCode}</li>
                <li><b>Start:</b> {new Date(trip.booking.startTime).toLocaleString()}</li>
                <li><b>End:</b> {new Date(trip.booking.endTime).toLocaleString()}</li>
                <li><b>Capacity:</b> {trip.booking.VehicleId?.Capacity} Kg</li>
              </ul>
              <button
                onClick={() => cancelBooking(trip.booking._id)}
                className="btn btn-danger mt-4"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
