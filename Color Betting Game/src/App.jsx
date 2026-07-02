import { useState, useEffect } from 'react'

function App() {
  // 1. Available 6 colors with modern hex codes for game mechanics
  const colors = [
    { name: "Crimson Red", hex: "#EF4444" },
    { name: "Emerald Green", hex: "#10B981" },
    { name: "Neon Blue", hex: "#3B82F6" },
    { name: "Cyber Yellow", hex: "#F59E0B" },
    { name: "Royal Purple", hex: "#8B5CF6" },
    { name: "Hot Pink", hex: "#EC4899" }
  ]

  // 2. React States (Game Memory)
  const [selectedBet, setSelectedBet] = useState(null) // User ki current prediction
  const [gameState, setGameState] = useState({ status: "idle", text: "Place your bet to start the roll!" })
  const [stats, setStats] = useState({ won: 0, lost: 0, total: 0, streak: 0 })
  
  // Timers States
  const [countdown, setCountdown] = useState(0) // 5s suspense countdown
  const [autoResetTimer, setAutoResetTimer] = useState(0) // 4s post-result hold time

  // 3. EFFECT 1: Core Suspense Countdown (5 Seconds)
  // Yeh timer background badle bina chalta hai aur khatam hote hi decision declare karega
  useEffect(() => {
    if (countdown === 0) {
      if (gameState.status === "shuffling") {
        revealResult() // decision time!
      }
      return
    }

    // Interval handler: decrease countdown by 1 every 1 second
    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // Cleanup: clear purana timer memory se release karna
    return () => clearInterval(timerId)
  }, [countdown, gameState.status])


  // 4. EFFECT 2: Auto Clean Screen Timer
  // Result dekhne ke baad console ko automatic clean (`idle`) state me laane ke liye
  useEffect(() => {
    if (autoResetTimer === 0) {
      if (gameState.status === "won" || gameState.status === "lost") {
        setSelectedBet(null) // user bet clear kar do
        setGameState({ status: "idle", text: "Ready for Next Round! Place your bet." })
      }
      return
    }

    const resetInterval = setInterval(() => {
      setAutoResetTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(resetInterval)
  }, [autoResetTimer, gameState.status])


  // 5. STEP A: Click Handler (Bet Initialization)
  // Button dabaate hi countdown screen aayegi
  const handleBetPlacement = (colorObj) => {
    setSelectedBet(colorObj)
    setGameState({ status: "shuffling", text: "🔮 Shuffling matrix in background..." })
    setCountdown(5) // Start 5s countdown
  }


  // 6. STEP B: Final Decision Engine (Khatam hone par hi trigger hoga)
  const revealResult = () => {
    // 💥 RNG: Array me se system hamesha randomly ek color chunega
    const randomIndex = Math.floor(Math.random() * colors.length)
    const systemColor = colors[randomIndex]

    // Result match validation logic
    if (selectedBet.hex === systemColor.hex) {
      // ✅ Win condition data pack
      setGameState({ 
        status: "won", 
        // Message with system color result highlighted in win popup
        text: `🎉 JACKPOT! You guessed correctly!`,
        result: systemColor // store result details here
      })
      setStats((prev) => ({ ...prev, won: prev.won + 1, total: prev.total + 1, streak: prev.streak + 1 }))
    } else {
      // 💀 Loss condition data pack with dynamic loss text
      setGameState({ 
        status: "lost", 
        text: `⚡ SWIPED OUT! Koi baat nahi! Dil chhota mat karo, ek baar fir se try kro! 💪`,
        result: systemColor // store result details here
      })
      setStats((prev) => ({ ...prev, lost: prev.lost + 1, total: prev.total + 1, streak: 0 }))
    }

    // Result display time set kiya (4 seconds screen hold)
    setAutoResetTimer(4)
  }

  // Define persistent background and glassmorphism colors
  const pageBgColor = "#1E293B" // Default Dark Theme Layout (Pure background fixed)
  const glassPanelColor = "bg-white/10" // Glass UI styling

  return (
    <div 
      className="w-full h-screen flex flex-col justify-between items-center py-8 px-4 transition-all duration-500 ease-out font-sans select-none"
      style={{ backgroundColor: pageBgColor }} // Hamesha default background rahega
    >
      {/* SCOREBOARD DASHBOARD */}
      <header className={`w-full max-w-md ${glassPanelColor} backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl text-white`}>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
            🎰 CHROMATIC BET v3
          </h1>
          {stats.streak > 0 && (
            <span className="bg-red-500 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              🔥 STREAK: {stats.streak}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold tracking-widest text-gray-300">
          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
            WON <span className="block text-lg font-black text-emerald-400 mt-1">{stats.won}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
            LOST <span className="block text-lg font-black text-rose-400 mt-1">{stats.lost}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
            TOTAL <span className="block text-lg font-black text-blue-400 mt-1">{stats.total}</span>
          </div>
        </div>
      </header>

      {/* CENTRAL GAME SCREEN (BIG TIMER POPUPS) */}
      <main className="w-full max-w-md flex flex-col items-center justify-center relative">
        
        {/* CONDITION A: 5 Seconds Countdown Mode (Big Bold Central UI) */}
        {gameState.status === "shuffling" && (
          <div className={`${glassPanelColor} backdrop-blur-2xl border border-white/20 text-white rounded-3xl p-10 shadow-[0_0_50px_rgba(255,255,255,0.15)] text-center scale-110 transform animate-pulse w-11/12 max-w-xs relative`}>
            {/* Visual indication that the countdown is live */}
            <span className="absolute top-2 right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            
            <p className="text-xs font-tracking uppercase text-yellow-400 tracking-widest mb-1">RNG Rolling...</p>
            <h2 className="text-8xl font-black mb-3 drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
              {countdown}s
            </h2>
            <p className="text-[10px] text-gray-300 tracking-wide">System will choose color in background!</p>
          </div>
        )}

        {/* CONDITION B: Game Ended Display Screen (Popup after countdown ends) */}
        {(gameState.status === "won" || gameState.status === "lost") && (
          <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl text-center w-11/12 max-w-sm transform transition-transform animate-fade-in relative">
            <h3 className={`text-xl font-black mb-3 tracking-wide ${gameState.status === "won" ? "text-emerald-400" : "text-rose-400"}`}>
              {gameState.status === "won" ? "🏆 JACKPOT!" : "💀 MATCH ENDED"}
            </h3>
            
            {/* Win/Loss description text */}
            <p className="text-sm font-semibold text-white leading-relaxed mb-4">{gameState.text}</p>
            
            {/* 💥 HERE: System Color display logic (popup me final color result) */}
            <div className="my-4 text-xs text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 space-y-2">
              <div className="flex justify-center items-center gap-2">
                <span className="font-medium tracking-wide">System chose:</span>
                {/* Result color name highlighted with dynamic hex color in CSS */}
                <span className="font-extrabold uppercase tracking-widest text-[13px] px-2 py-0.5 rounded-full border"
                  style={{ color: gameState.result?.hex, borderColor: `${gameState.result?.hex}20`, backgroundColor: `${gameState.result?.hex}05` }}
                >
                  {gameState.result?.name}
                </span>
              </div>
              {/* Also show dynamic visual color match/mismatch visualizer micro popup inside main popup */}
              <div className="flex gap-2 justify-center pt-1 border-t border-white/5">
                <div className="w-8 h-8 rounded border border-white/10 shadow-lg" style={{ backgroundColor: selectedBet?.hex }} title={`You bet: ${selectedBet?.name}`}></div>
                <div className="text-sm pt-1 text-gray-500">{`(${gameState.status === "won" ? "=" : "≠"})`}</div>
                <div className="w-8 h-8 rounded border border-white/10 shadow-lg animate-pulse" style={{ backgroundColor: gameState.result?.hex }} title={`System chose: ${gameState.result?.name}`}></div>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION C: Idle Waiting screen */}
        {gameState.status === "idle" && (
          <div className="bg-black/30 backdrop-blur-sm border border-white/5 text-white/90 px-6 py-4 rounded-xl text-center font-medium tracking-wide shadow-inner text-sm">
            {gameState.text}
          </div>
        )}
      </main>

      {/* CONTROLS GRID */}
      <footer className="w-full max-w-md flex flex-col items-center gap-4 mb-2 relative">
        <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          {gameState.status === "shuffling" ? "🔒 Inputs Locked During Count" : "Lock your lucky color"}
        </p>
        
        <div className="grid grid-cols-3 gap-3 w-full bg-black/30 backdrop-blur-lg p-3 rounded-2xl border border-white/10 shadow-2xl relative">
          
          {colors.map((color) => {
            const isControlLocked = gameState.status === "shuffling" || gameState.status === "won" || gameState.status === "lost";
            
            return (
              <button
                key={color.hex}
                disabled={isControlLocked}
                onClick={() => handleBetPlacement(color)}
                className={`h-14 rounded-xl font-black text-white text-xs tracking-wider uppercase transition-all border border-white/10 relative overflow-hidden
                  ${isControlLocked ? "opacity-20 cursor-not-allowed scale-95" : "hover:-translate-y-1 active:scale-95 cursor-pointer"}
                `}
                style={{ 
                  backgroundColor: color.hex,
                  boxShadow: isControlLocked ? "none" : `0 4px 14px 0 ${color.hex}40`,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                }}
              >
                {/* Modern subtle glare effect on hover */}
                {!isControlLocked && <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>}
                {color.name.split(" ")[0]}
              </button>
            )
          })}
        </div>
      </footer>
    </div>
  )
}

export default App