# 🎰 Colour Betting Game v3.0 (Suspense Matrix)

Welcome to the **Colour Betting Game**, a next-level transformation of a simple background-changer app into a fully functional, state-driven Arcade style betting game. Built during my React learning journey inspired by Chai aur Code!

## 🚀 How the Game Works (Rules)
* **Lock Your Bet:** Control panel se apna lucky colour button daba kar apni bet lock karein (Total 6 options).
* **The Suspense (5s Countdown):** Jaise hi aap click karenge, saare buttons lock ho jayenge, background dark hi rahega, aur center me ek bada sa 5-second ka countdown timer chalega full suspense ke sath!
* **The Reveal:** Jaise hi timer `0s` hoga, system apna random colour select karega, screen par result pop-up aayega aur wahan dikhega ki kaunsa colour aaya hai (by name and by its true colour).
* **Dynamic Feedback & Motivation:** 
  * Agar aapka aur system ka colour match ho gaya, toh aap **Jackpot** jeet gaye! 🏆
  * Agar galat hua toh aap haar gaye, aur screen par ek badhiya positive message aayega: *`Koi baat nahi! Dil chhota mat karo, ek baar fir se try kro! 💪`*
* **Auto-Reset (4s):** Kisi button ko dabane ki zaroorat nahi hai, 4 second baad game apne aap automatic reset ho jayega agle round ke liye.
* **Streak Counter:** Aap lagatar kitni baar jeet rahe ho, uski live streak chalegi!

---

## 🛠️ Tech Stack & React Concepts Applied
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS v4 (Glassmorphism `backdrop-blur` aur glowing dynamic shadows)
* **State Management:** Multiple `useState` hooks ka use kiya hai game status (`idle`, `shuffling`, `won`, `lost`), scoreboards, streaks, aur system results ko manage karne ke liye.
* **Side Effects & Cleanups:** Do alag-alag `useEffect` hooks ka use kiya hai—ek 5-second countdown ke liye aur ek 4-second auto-reset ke liye, memory leak se bachne ke liye `clearInterval` ke sath.

---

## 📦 How to Run Locally

1. **Clone the repository:**
   
   git clone [https://github.com/deepndrasingh62272-beep/react-learning-journey.git](https://github.com/deepndrasingh62272-beep/react-learning-journey.git)

2. **Navigate into the folder:**

  cd 04bgchanger

3. **Install dependencies:**

  npm install

4. **Start the local development server:**

  npm run dev
