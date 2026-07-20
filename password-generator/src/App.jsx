import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const passwordRef = useRef(null)

  // Password Generation Logic
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  // Clipboard Copy Logic
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    // Parent wrapper that centers everything vertically and horizontally
    <div className="min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center px-4 selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      
      {/* Absolute Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Card - Perfectly Centered */}
      <div className="relative w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-slate-950/80 backdrop-blur-md">
        
        {/* Centered Heading */}
        <h1 className="text-center text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8 tracking-tight">
          Password Generator
        </h1>

        {/* Password Output Area (Centered Input Display) */}
        <div className="relative flex flex-col items-center justify-center bg-slate-950/90 border border-slate-800 rounded-2xl p-4 focus-within:border-cyan-500/40 transition-all duration-300 mb-6">
          <input
            type="text"
            value={password}
            className="w-full bg-transparent text-cyan-400 font-mono text-2xl text-center tracking-widest py-2 outline-none select-all"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          
          {/* Centered Action Button below the password */}
          <button
            onClick={copyPasswordToClipboard}
            className={`mt-3 px-8 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 transform active:scale-95 cursor-pointer w-full text-center ${
              isCopied 
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25' 
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-cyan-600/20'
            }`}
          >
            {isCopied ? '✓ Copied To Clipboard!' : 'Copy Password'}
          </button>
        </div>

        {/* Centered Controls Grid */}
        <div className="space-y-5">
          
          {/* Slider Layout */}
          <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-4 flex flex-col items-center">
            <div className="flex justify-between w-full items-center mb-2.5 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Length</span>
              <span className="text-sm font-bold font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-900/40 px-2.5 py-0.5 rounded-md">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
            />
          </div>

          {/* Feature Checkboxes (2 Column Grid) */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Numbers Control */}
            <label className="flex items-center justify-center gap-x-3 p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl cursor-pointer hover:border-slate-800 transition-colors select-none group">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 accent-cyan-500 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">Numbers</span>
            </label>

            {/* Characters Control */}
            <label className="flex items-center justify-center gap-x-3 p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl cursor-pointer hover:border-slate-800 transition-colors select-none group">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 accent-cyan-500 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">Symbols</span>
            </label>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App