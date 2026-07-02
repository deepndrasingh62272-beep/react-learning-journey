# ⚡ Cyber Pass Gen v1.0 (`05passwordgenerator`)

Welcome to the **Cyber Pass Gen**, a highly optimized, modern, and feature-rich Password Generator built using **React.js** and **Tailwind CSS v4**. This project takes the classic password generator concept and upgrades it with an advanced UI and smart reactive features.

## 🚀 Key Features & New Ideas
* **Advanced State Management:** Uses React hooks (`useState`) to track password criteria like length, numbers, and special characters in real-time.
* **Dynamic Password Strength Meter:** Analyzes the password complexity on the fly and shows a glowing indicator bar (**Weak 😡**, **Medium 🫡**, **Strong 💪**) that changes color dynamically.
* **Smart Clipboard Feedback:** Uses the React `useRef` hook to visually select the text upon copying, combined with a 2-second inline button feedback (`Copied! 👍`) instead of annoying alert popups.
* **Instant Shuffle:** Added a dedicated quick-regenerate/shuffle button (`🎲`) to roll a new password instantly without altering your checkbox settings.
* **Tailwind CSS v4 Architecture:** Styled completely using Tailwind v4's minimalist dark-theme utilities, glassmorphism panels, and smooth reactive transitions.

---

## 🛠️ Tech Stack & React Concepts Applied
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS v4
* **Hooks Used:**
  * `useState` — For managing password string, length sliders, toggles, and UI states.
  * `useCallback` — For memoizing the generation and clipboard functions to optimize performance.
  * `useEffect` — To automatically trigger the password generator whenever user preferences change.
  * `useRef` — For gaining direct access to the input DOM node to create the native copy-selection effect.

---

## 📦 How to Run Locally

1. **Navigate into this project folder:**
  
   cd 05passwordgenerator
   
2. **Navigate into the folder:**

   cd 04bgchanger

3. **Install dependencies:**

   npm install

4. **Start the local development server:**

   npm run dev
