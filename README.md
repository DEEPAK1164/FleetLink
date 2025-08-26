# 🚚 FleetLink — Logistics Vehicle Booking System

FleetLink is a full-stack platform to manage and book logistics vehicles for B2B clients.  
Admins can add vehicles, users can search availability (by capacity, route, time) and book with conflict-free validation.

---

## 📦 Tech Stack

- **Frontend:** React + Redux (Fetch/Axios)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Testing:** Jest (backend unit tests)
- **Package managers:** npm / pnpm / yarn

---

## ✨ Features

- Add vehicles with validation
- Search available vehicles by:
  - `capacityRequired`, `fromPincode`, `toPincode`, `startTime`
- Returns **estimated ride duration** for the queried route
- Book vehicles with **race-condition safe** re-verification (overlap check)
- Clear success/error responses
- Unit tests for core backend logic

---

## 🧠 Core Logic

**Estimated Ride Duration (hours)**  
> Placeholder logic for demo purposes:
```js
const estimatedRideDurationHours =
  Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
