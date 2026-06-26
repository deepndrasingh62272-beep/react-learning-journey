import React from 'react'

function ChaiCard({ teaType = 'Normal Chai', price = '₹10', rating = '4.5' }) {
  return (
    <div className="w-64 p-5 bg-amber-50/90 border border-amber-200 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
      <div className="text-5xl mb-3">☕</div>
      <h2 className="text-xl font-bold text-amber-950 mb-2">{teaType}</h2>
      <p className="text-sm text-amber-700 mb-4">Perfect choice for a warming tea break.</p>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full shadow-sm">
          {price}
        </span>
        <span className="text-sm font-medium text-yellow-700">⭐ {rating}</span>
      </div>
    </div>
  )
}

export default ChaiCard
