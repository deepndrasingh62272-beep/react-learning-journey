# ⚡ Cyber Pass Gen (`05-secure-pass`)

Welcome to **Cyber Pass Gen**, a highly optimized, ultra-modern Password Generator built from scratch using **React.js (Vite)** and the brand new **Tailwind CSS v4** architecture. This project features a clean cyberpunk glassmorphic UI, real-time feedback, and high-performance state management.

---

## 🚀 Key Features & Naye Ideas
* **Tailwind CSS v4 Engine:** Completely styled using the modern v4 utility-first approach with zero configuration overhead (no `tailwind.config.js` or `postcss` boilerplate).
* **Dynamic Strength Analyzer:** A reactive progress bar that tracks password complexity in real-time and updates dynamically (**Weak 😡**, **Medium 🫡**, **Strong 💪**) with smooth transitions.
* **Smart Clipboard Integration:** Uses React's `useRef` hook to visually highlight the text upon copying, paired with a 2-second custom button state (`Copied! 👍`) instead of browser alert boxes.
* **Instant Re-roll (Shuffle):** A quick dice button (`🎲`) to instantly shuffle and generate a new password without resetting your length or custom character preferences.

---

## 🛠️ Core React Concepts Applied
* **`useState`** — Managed local component memory for password lengths, checkboxes, and copy feedback states.
* **`useCallback`** — Memoized the password generation logic and copy actions to prevent unnecessary re-renders and boost performance.
* **`useEffect`** — Automated the synchronization between user preferences (slider, toggles) and the password generation system.
* **`useRef`** — Directly interacted with the DOM input field to handle native browser text selection dynamically.

---

