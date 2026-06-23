import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter, setCounter] = useState(15)

  const addValue = () => {
    setCounter((prev) => prev + 1)
  }

  const removeValue = () => {
    setCounter((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <>
      <h1>Hello, Vite + React!</h1>
      <br />
      <h2>counter value: {counter}</h2>
      <button onClick={addValue}>add value</button>
      <br />
      <button onClick={removeValue}>remove value</button>
    </>
  )
}

export default App
