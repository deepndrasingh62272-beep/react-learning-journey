import React from 'react'

// TeaCard component receives one tea object and a click handler from App.jsx
// Ye component sirf ek tea item ko display karega aur click event bhejega parent ko.
function TeaCard({ tea, onSelect, isActive }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tea.id)}
      className={`w-full text-left rounded-3xl border p-5 transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 ${
        isActive ? 'border-amber-300 bg-amber-50/20' : 'border-zinc-800 bg-zinc-900'
      }`}
    >
      {/* Badge section: Bestseller and Offer badges shown conditionally */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tea.isBestSeller && (
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            🔥 Bestseller
          </span>
        )}
        {tea.discount && (
          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-100">
            🏷️ {tea.discount}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* emoji or image for tea */}
        <div className="text-4xl">{tea.emoji}</div>
        <div className="space-y-1 text-right">
          <p className="text-sm font-medium text-slate-400">Rating</p>
          <p className="text-lg font-semibold text-amber-300">⭐ {tea.rating}</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold text-white">{tea.name}</h3>
        <p className="mt-2 text-sm text-slate-400">{tea.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-200">
        <span className="font-semibold text-white">Price</span>
        <span className="font-bold text-amber-300">{tea.price}</span>
      </div>
    </button>
  )
}

export default TeaCard
