// React se hooks import kar rahe hain (useId unique HTML input id banane ke liye)
// (Importing React and useId hook to create unique HTML input IDs)
import React, { useId } from 'react';

// react-world-flags package se Flag component import kar rahe hain
// (Importing Flag component from react-world-flags package)
import FlagPackage from 'react-world-flags';

// Module compatibility fix (Agar package default export object ho to handling)
// (Handling module export compatibility for flag package)
const Flag = FlagPackage.default || FlagPackage;

// Currencies ko country codes se map kar rahe hain taaki sahi flag dikhe
// (Mapping currency codes to country codes to display the correct flag)
const currencyToCountry = {
  usd: 'US',
  inr: 'IN',
  eur: 'EU',
  gbp: 'GB',
  jpy: 'JP',
  cad: 'CA',
  aud: 'AU',
  // Aap zarurat ke hisaab se aur country codes add kar sakte hain
};

function CurrencyInputCard({
    label,                  // "From" ya "To" text prop
    amount,                 // Input field ka numeric value
    onAmountChange,         // Amount change hone par parent state update karne ka function
    onCurrencyChange,       // Currency dropdown change hone par callback function
    currencyOptions = [],   // Dropdown ke liye currencies ki list array (['usd', 'inr'...])
    selectCurrency = "usd",// Currently selected currency (default: 'usd')
    amountDisable = false,  // Output field (To) ko read-only/lock rakhne ke liye flag
}) {
    // Label aur input ko aapas me link karne ke liye unique ID generate kar rahe hain
    // (Generating a unique ID to link label with input element)
    const inputId = useId();

    // Selected currency ke basis par country code nikal rahe hain (Default 'UN' if not found)
    // (Extracting country code based on selected currency)
    const countryCode = currencyToCountry[selectCurrency.toLowerCase()] || 'UN';

    return (
        // Main Card Container - Glassmorphic look with blur & light border
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-xl flex flex-col gap-3">
            
            {/* Label Section: "FROM" ya "TO" Header */}
            <div className="flex justify-between items-center text-sm text-gray-300">
                <label htmlFor={inputId} className="font-medium uppercase tracking-wider">
                    {label}
                </label>
            </div>

            {/* Input Row: Flag + Dropdown + Numeric Input */}
            <div className="flex items-center gap-4">
                
                {/* Left Side Box: Flag Icon + Select Currency Dropdown */}
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl border border-white/10">
                    
                    {/* Country Flag Component */}
                    <Flag code={countryCode} className="w-8 h-6 rounded object-cover" />
                    
                    {/* Currency Select Dropdown */}
                    <select
                        value={selectCurrency} // Currently selected currency
                        // User jab currency badle tab callback trigger karo
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        className="bg-transparent text-white text-lg font-semibold focus:outline-none cursor-pointer uppercase"
                    >
                        {/* Array.map se saare dropdown options render kar rahe hain */}
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency} className="bg-slate-800 text-white uppercase">
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Right Side: Numeric Amount Input Box */}
                <div className="flex-1 text-right">
                    <input
                        id={inputId}
                        type="number"
                        placeholder="0.00"
                        // Agar amount 0 ho to placeholder dikhane ke liye empty string rakho
                        value={amount === 0 ? '' : amount}
                        disabled={amountDisable} // 'To' side par input locked rahega
                        // Typing karne par parent state me number value pass kar rahe hain
                        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                        className="w-full bg-transparent text-white text-3xl font-bold text-right outline-none placeholder:text-gray-500"
                    />
                </div>

            </div>
        </div>
    );
}

export default CurrencyInputCard;