# ☕ Chai Counter & Customizer App

Welcome to the **03tailwindprops** project! This repository is a part of my React learning journey inspired by Hitesh Choudhary Sir's legendary **"Chai aur Code"** series (around Lecture 7).

This project focuses on hands-on practice with Core React concepts rather than just watching tutorials.

## 🚀 Concepts Practiced
- **React Components**: Breaking down the UI into small, isolated, and reusable pieces.
- **Props (Properties)**: Passing dynamic data from `App.jsx` to the `ChaiCard` component.
- **State (`useState` Hook)**: Managing dynamic counter data that updates the UI instantly.
- **Conditional Rendering**: Displaying logical custom warnings based on the state value (`count`).
- **Tailwind CSS**: Implementing a clean, modern, and dark-themed responsive UI.

## 📱 Features
- **Interactive Counter**: Add or remove chai cups using an intuitive button layout.
- **Smart Validation**: The counter doesn't go below `0`.
- **Dynamic Notices**:
  - Shows `Chai khatam! Aur banao. ☕` when count is `0`.
  - Shows a friendly warning `Bhai, itni chai mat piyo! ⚠️` if you drink more than 5 cups.
- **Reusable Tea Cards**: Dynamically lists different types of tea passing `teaType`, `price`, and `rating` via props.

## 🛠️ How to run locally

1. Navigate to this directory:
   ```bash
   cd 03tailwindprops
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---
*Made with ❤️ and a lot of Chai while learning from Hitesh Sir.*
