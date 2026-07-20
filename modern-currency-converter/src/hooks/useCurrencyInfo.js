// React se hooks import kar rahe hain. 
// useEffect API calls/side-effects ke liye aur useState data/rates ko store karne ke liye.
// (Importing React hooks. useEffect for API calls/side-effects, useState to store fetched rates data.)
import { useEffect, useState } from "react";

// Custom Hook function definition jo 'currency' string (e.g., 'usd') accept karta hai
// (Custom Hook definition that receives the 'currency' code as a parameter)
function useCurrencyInfo(currency) {
    
    // 'data' state create kar rahe hain initialized with an empty object {}
    // (Creating a state variable 'data' initialized as an empty object {})
    const [data, setData] = useState({});

    // useEffect tab chalega jab component mount hoga ya 'currency' ki value badlegi
    // (useEffect runs on initial load and whenever the 'currency' parameter changes)
    useEffect(() => {
        
        // Selected currency ke hisaab se live API URL par HTTP request bhej rahe hain
        // (Fetching live exchange rate JSON data for the selected currency from the API)
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            
            // API Response ko JSON object me parse/convert kar rahe hain
            // (Parsing the raw API HTTP response into a usable JSON object)
            .then((res) => res.json())
            
            // JSON me se required currency key (res['usd']) nikal kar state me save kar rahe hain
            // (Extracting the specific currency object e.g., res['usd'] and saving it in 'data' state)
            .then((res) => setData(res[currency]))
            
            // Network ya API error aane par use catch karke console me show kar rahe hain
            // (Catching and logging any network or API error to the console)
            .catch((err) => console.error("API Error:", err));
            
    }, [currency]); // Dependency Array: jab 'currency' badlegi tabhi ye API call dobara chalega
                    // (Dependency Array: Triggers API re-fetch when 'currency' changes)

    // Component ko live rates object return kar rahe hain
    // (Returning the rates object to the calling component)
    return data;
}

// Hook ko default export kar rahe hain taaki baaki components me use kar sakein
// (Exporting the hook so it can be imported across other files in the project)
export default useCurrencyInfo;