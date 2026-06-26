import { useState } from 'react'
import TeaCard from './components/TeaCard'
import './App.css'

function App() {
  // Master data array: yeh array humare chai menu ko define karta hai.
  const teaMenu = [
    {
      id: 1,
      name: 'Adrak Chai',
      price: '₹15',
      rating: '4.9',
      emoji: '🍵',
      description: 'Garam aur strong adrak chai, thandi subah ke liye perfect.',
      isBestSeller: true,
      discount: '10% OFF',
    },
    {
      id: 2,
      name: 'Masala Chai',
      price: '₹20',
      rating: '4.8',
      emoji: '🫖',
      description: 'Masaledar chai with elaichi, dalchini, and ginger for perfect flavour.',
      isBestSeller: true,
      discount: '15% OFF',
    },
    {
      id: 3,
      name: 'Matcha Green Tea',
      price: '₹35',
      rating: '4.7',
      emoji: '🍃',
      description: 'Healthy green tea with matcha powder for chamakdaar skin and energy.',
      isBestSeller: false,
      discount: '5% OFF',
    },
    {
      id: 4,
      name: 'Elaichi Chai',
      price: '₹18',
      rating: '4.6',
      emoji: '🌿',
      description: 'Light elaichi flavour, soft aroma aur shaam ke time perfect.',
      isBestSeller: false,
      discount: '',
    },
    {
      id: 5,
      name: 'Tulsi Chai',
      price: '₹17',
      rating: '4.5',
      emoji: '🌱',
      description: 'Tulsi wali chai jo immunity ko boost kare aur digestive comfort de.',
      isBestSeller: false,
      discount: '8% OFF',
    },
  ]

  // selectedTeaId state rakhta hai currently selected tea card ka id.
  const [selectedTeaId, setSelectedTeaId] = useState(teaMenu[0].id)

  // selectedTea ko calculate karne ke liye array se current selected id match karte hain.
  const selectedTea = teaMenu.find((tea) => tea.id === selectedTeaId)

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 px-4 py-10 font-sans">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400/80 mb-2">Chai Shop Menu</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Chai Shop Menu & Details App
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400">
            State, props, and array mapping ka practical example with React + Tailwind.
          </p>
        </header>

        <main className="grid gap-10 xl:grid-cols-[0.95fr_0.95fr] items-start">
          {/* Left column: tea menu cards */}
          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-2">Tea Menu</h2>
              <p className="text-slate-400">Click any tea card to see its full details below.</p>
            </div>

            {/* Array mapping: teaMenu array ko map karke TeaCard components ban rahe hain. */}
            <div className="grid gap-4 sm:grid-cols-2">
              {teaMenu.map((tea) => (
                <TeaCard
                  key={tea.id}
                  tea={tea}
                  onSelect={setSelectedTeaId}
                  isActive={tea.id === selectedTeaId}
                />
              ))}
            </div>
          </section>

          {/* Right column: selected tea detail view */}
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-amber-400/80">Selected Tea</p>
                <h2 className="text-3xl font-bold text-white mt-2">{selectedTea.name}</h2>
              </div>
              <div className="rounded-3xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-slate-100">
                Price: <span className="text-amber-300">{selectedTea.price}</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 shadow-inner shadow-black/30">
              <div className="flex items-center gap-5">
                <div className="text-6xl">{selectedTea.emoji}</div>
                <div>
                  <p className="text-sm text-slate-400">Rating</p>
                  <p className="text-2xl font-bold text-amber-300">⭐ {selectedTea.rating}</p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-slate-300 leading-7">{selectedTea.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-zinc-900 p-5">
                    <p className="text-sm text-slate-400">Best Seller</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {selectedTea.isBestSeller ? 'Yes, beloved choice' : 'Not a bestseller yet'}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-zinc-900 p-5">
                    <p className="text-sm text-slate-400">Current Offer</p>
                    <p className="mt-2 text-xl font-semibold text-amber-300">
                      {selectedTea.discount || 'No offer available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
