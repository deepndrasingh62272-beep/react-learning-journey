// React State hook import kar rahe hain state management ke liye
import { useState } from 'react';

// Apna Modern UI Component import kar rahe hain
import CurrencyInputCard from './components/CurrencyInputCard';

// API se live rates lane wala Custom Hook import kar rahe hain
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  // 1. Amount state (Default value: 100)
  const [amount, setAmount] = useState(100);

  // 2. Base currency state ("From", default: 'usd')
  const [from, setFrom] = useState("usd");

  // 3. Target currency state ("To", default: 'inr')
  const [to, setTo] = useState("inr");

  // 4. Converted final calculated result state
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Custom hook se current 'from' currency ke saare rates object le rahe hain
  // (Fetching live exchange rates object for selected 'from' currency)
  const currencyInfo = useCurrencyInfo(from);

  // Exchange rates object ki keys nikal kar dropdown ke liye array bana rahe hain
  // (Extracting object keys into an array for dropdown options e.g. ['usd', 'inr', 'eur'])
  const options = Object.keys(currencyInfo);

  // SWAP Function: 'From' aur 'To' ki values aur amounts ko aapas me badalta hai
  // (Swaps currencies and amounts between 'From' and 'To')
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // CONVERT Function: Current rate se multiply karke calculation karta hai
  // (Calculates conversion amount using API rate)
  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    // Outer Wrapper Container with Full Height Dark Radial Gradient Background
    <div 
      className="w-full h-screen flex justify-center items-center bg-slate-950 p-4"
      style={{ backgroundImage: `radial-gradient(circle at center, #1e293b 0%, #020617 100%)` }}
    >
      
      {/* Central Glassmorphic Dashboard Box */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        
        {/* Header Title Section */}
        <div className="text-center mb-2">
          <h1 className="text-white text-4xl font-extrabold tracking-tight">CURRENCY CONVERTER</h1>
          <p className="text-gray-400 text-lg mt-1">Fast, live exchange rates</p>
        </div>

        {/* Main Form (Submit hone par convert run hoga) */}
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); // Page refresh hone se roko
            convert();          // Calculation run karo
          }} 
          className="w-full flex flex-col gap-2"
        >
          
          {/* Grid Layout: Left Card - Swap Button - Right Card */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-4">
            
            {/* 1. "From" Currency Input Card */}
            <CurrencyInputCard
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />

            {/* 2. Middle Circular Swap Button (⇄) */}
            <div className="flex justify-center z-10">
              <button
                type="button"
                onClick={swap} // Click karne par swap function chalega
                className="w-12 h-12 flex items-center justify-center border-2 border-white/20 bg-slate-800 rounded-full text-white text-2xl cursor-pointer hover:bg-slate-700 active:scale-95 transition-all shadow-lg"
              >
                ⇄
              </button>
            </div>

            {/* 3. "To" Currency Output Card */}
            <CurrencyInputCard
              label="To"
              amount={convertedAmount} // Conversion ka result dikhega
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable // Result field disabled rahega
            />

          </div>

          {/* Action Button: Convert Button */}
          <div className="mt-8 w-full flex flex-col items-center gap-4">
            <button 
              type="submit" 
              className="w-full max-w-sm bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer hover:bg-blue-500 active:scale-95 transition-all uppercase tracking-wider shadow-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default App;