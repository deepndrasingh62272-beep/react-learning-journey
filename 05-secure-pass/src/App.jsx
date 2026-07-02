import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // --- 1. STATE MANAGEMENT (Memory Variables) ---
  // length: Password ki lambai track karega (Default: 8)
  const [length, setLength] = useState(8)
  // numberAllowed: Kya numbers (0-9) include karne hain? (True/False)
  const [numberAllowed, setNumberAllowed] = useState(false)
  // charAllowed: Kya symbols (@#$) include karne hain? (True/False)
  const [charAllowed, setCharAllowed] = useState(false)
  // password: Jo final password generate hoga, wo isme store hoga
  const [password, setPassword] = useState("")
  // isCopied: Copy button ke temporary text 'Copied! 👍' ko manage karega
  const [isCopied, setIsCopied] = useState(false)

  // --- 2. useRef HOOK (DOM Reference) ---
  // Iska use hum input box ko select karne aur blue highlight effect dene ke liye karenge
  const passwordRef = useRef(null)

  // --- 3. PASSWORD GENERATOR LOGIC (Optimized with useCallback) ---
  // useCallback isliye lagaya taaki ye function baar-baar memory me recreate na ho
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  // --- 4. COPY TO CLIPBOARD FUNCTION ---
  const copyPasswordToClipboard = useCallback(() => {
    // Input text ko desktop/mobile dono par auto-select karne ke liye reference use kiya
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)
    
    // Core JavaScript Clipboard API to copy text
    window.navigator.clipboard.writeText(password)
    
    // Alert popup ki jagah 2 second ke liye button change karne ka stylish idea
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [password])

  // --- 5. useEffect HOOK (Automatic Trigger) ---
  // Jaise hi length badle ya checkbox par click ho, ye function apne aap run ho jayega
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  // --- 6. ADVANCED IDEA: DYNAMIC STRENGTH METER ---
  const getStrength = () => {
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (numberAllowed) score++
    if (charAllowed) score++
    
    if (score <= 1) return { text: "Weak 😡", color: "bg-rose-500", width: "w-1/3" }
    if (score === 2) return { text: "Medium 🫡", color: "bg-yellow-500", width: "w-2/3" }
    return { text: "Strong 💪", color: "bg-emerald-500", width: "w-full" }
  }
  const strength = getStrength()

  return (
    <div className="w-full h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 font-sans">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl text-white">
        
        <h1 className="text-2xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
          ⚡ CYBER PASS GEN
        </h1>

        {/* Password Display Field */}
        <div className="flex bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-1 mb-4">
          <input
            type="text"
            value={password}
            className="w-full bg-transparent px-4 py-3 font-mono text-cyan-300 font-bold tracking-wider outline-none"
            placeholder="Generating security..."
            readOnly
            ref={passwordRef}
          />
          <div className="flex gap-1 items-center pr-1">
            <button onClick={passwordGenerator} className="p-2.5 text-gray-400 hover:text-white bg-white/5 rounded-xl cursor-pointer">🎲</button>
            <button
              onClick={copyPasswordToClipboard}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-300 cursor-pointer
                ${isCopied ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"}`}
            >
              {isCopied ? "Copied! 👍" : "Copy"}
            </button>
          </div>
        </div>

        {/* Live Strength Progress Bar */}
        <div className="mb-6 bg-black/20 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-bold">
            <span>STRENGTH:</span>
            <span className="text-white uppercase">{strength.text}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} ${strength.width} transition-all duration-500`}></div>
          </div>
        </div>

        {/* Custom Controls */}
        <div className="space-y-4 bg-black/20 p-4 rounded-2xl border border-white/5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold text-gray-400">
              <span>PASSWORD LENGTH:</span>
              <span className="text-cyan-400 font-mono text-sm">{length}</span>
            </div>
            <input 
              type="range" min={6} max={32} value={length}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <hr className="border-white/5" />
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 bg-white/5 px-3 py-2.5 rounded-xl cursor-pointer select-none">
              <input type="checkbox" checked={numberAllowed} className="accent-cyan-400" onChange={() => setNumberAllowed((prev) => !prev)} />
              <span className="text-xs font-bold text-gray-300">0-9 Numbers</span>
            </label>
            <label className="flex items-center gap-3 bg-white/5 px-3 py-2.5 rounded-xl cursor-pointer select-none">
              <input type="checkbox" checked={charAllowed} className="accent-cyan-400" onChange={() => setCharAllowed((prev) => !prev)} />
              <span className="text-xs font-bold text-gray-300">#$& Symbols</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App