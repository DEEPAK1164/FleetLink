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

<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/c95c76c0-23c8-46f3-ae74-6bfc6624bba6" />

<img width="1916" height="968" alt="image" src="https://github.com/user-attachments/assets/f0b6e0e6-6aac-47c1-ab7f-6b8db08eb27c" />

<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/bfc28d2f-af8b-4b6a-9fa5-21b0e10d479f" />

<img width="1917" height="945" alt="image" src="https://github.com/user-attachments/assets/3d4ed44f-a068-4bc5-99ca-b8fb97c1ef91" />

<img width="1912" height="952" alt="image" src="https://github.com/user-attachments/assets/786d9f56-eae7-4007-ac1b-eef4fd96dc06" />

<img width="1916" height="945" alt="image" src="https://github.com/user-attachments/assets/828267e8-522b-4477-986c-20e9ca7b2f01" />

<img width="1915" height="945" alt="image" src="https://github.com/user-attachments/assets/509ae701-73ca-411e-b115-c296005a35e4" />

<img width="1889" height="940" alt="image" src="https://github.com/user-attachments/assets/26b47c40-8111-46c8-b518-1de5f849fb1b" />








