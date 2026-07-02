import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // 1. React States (Password Ke State Variables)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false) // Copy feedback state

  // 2. useRef Hook (Input field ka reference lene ke liye - Selection effect ke liye)
  const passwordRef = useRef(null)

  // 3. Core Password Generator Logic (Optimized with useCallback)
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

  // 4. Copy to Clipboard Function
  const copyPasswordToClipboard = useCallback(() => {
    // Input text ko blue/gray select effect dene ke liye reference ka use
    passwordRef.current?.select()
    // Mobile range selection optimization
    passwordRef.current?.setSelectionRange(0, 99)
    
    // Core Clipboard API mechanism
    window.navigator.clipboard.writeText(password)
    
    // 💥 New Idea: Custom state feedback (Bina annoying popups ke button text badlega)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [password])

  // 5. useEffect Hook (Jab bhi length, dependencies badlein, naya password auto-generate ho)
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  // 💥 New Idea: Password Strength Analyzer Logic
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
    <div className="w-full h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 font-sans selection:bg-cyan-500/30">
      
      {/* MAIN CONTAINER: Premium Glassmorphism Look */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-white">
        
        {/* Title */}
        <h1 className="text-2xl font-black tracking-wide text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase">
          ⚡ CYBER PASS GEN
        </h1>

        {/* INPUT & COPY ROW */}
        <div className="flex bg-black/40 border border-white/5 rounded-2xl overflow-hidden mb-4 shadow-inner p-1">
          <input
            type="text"
            value={password}
            className="w-full bg-transparent px-4 py-3 font-mono text-cyan-300 font-bold tracking-wider outline-none text-base select-all"
            placeholder="Generating security..."
            readOnly
            ref={passwordRef}
          />
          
          {/* Action Row: Shuffle & Copy */}
          <div className="flex gap-1 pr-1 items-center">
            {/* 🔄 Shuffle/Regenerate Button */}
            <button 
              onClick={passwordGenerator}
              className="p-2.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer active:scale-95"
              title="Regenerate Password"
            >
              🎲
            </button>
            
            {/* 📋 Copy Button with dynamic states */}
            <button
              onClick={copyPasswordToClipboard}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer shadow-md
                ${isCopied 
                  ? "bg-emerald-500 text-white shadow-emerald-500/20 animate-bounce-short" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white shadow-cyan-500/10"
                }
              `}
            >
              {isCopied ? "Copied! 👍" : "Copy"}
            </button>
          </div>
        </div>

        {/* DYNAMIC STRENGTH METER */}
        <div className="mb-6 bg-black/20 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-bold tracking-wide">
            <span>STRENGTH:</span>
            <span className="uppercase text-white">{strength.text}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} ${strength.width} transition-all duration-500 ease-out`}></div>
          </div>
        </div>

        {/* CONTROLS: Sliders and Checkboxes */}
        <div className="space-y-4 bg-black/20 p-4 rounded-2xl border border-white/5">
          
          {/* Length Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-wider text-gray-400">
              <span>PASSWORD LENGTH:</span>
              <span className="text-cyan-400 font-mono text-sm">{length}</span>
            </div>
            <input 
              type="range"
              min={6}
              max={32}
              value={length}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <hr className="border-white/5" />

          {/* Checkboxes Row */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Numbers Trigger */}
            <label className="flex items-center gap-3 bg-white/5 px-3 py-2.5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors select-none">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                className="w-4 h-4 rounded text-cyan-500 bg-black/40 border-white/10 focus:ring-0 cursor-pointer accent-cyan-400"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <span className="text-xs font-bold tracking-wide text-gray-300">0-9 Numbers</span>
            </label>

            {/* Special Characters Trigger */}
            <label className="flex items-center gap-3 bg-white/5 px-3 py-2.5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors select-none">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                className="w-4 h-4 rounded text-cyan-500 bg-black/40 border-white/10 focus:ring-0 cursor-pointer accent-cyan-400"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <span className="text-xs font-bold tracking-wide text-gray-300">#$& Symbols</span>
            </label>

          </div>
        </div>

      </div>
    </div>
  )
}

export default App