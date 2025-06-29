import { useState } from 'react'
import './App.css'
import TargetInput from './components/TargetInput'

function App() {
  const [target, setTarget] = useState('')


  const COINS_DENOMINATIONS = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

  function handleTargetInput(value) {
    // Allow empty or a number with max 2 decimals
    if (value === '' || /^\d{1,5}(\.\d{0,2})?$/.test(value)) {
      setTarget(value);
    }
  }



  return (
    <>
      <div class="container-sm">
        <h1>Coin Change Calculator</h1>
        <p>By Kin Seng</p>
        <br />
        <TargetInput target={target} handleTargetInput={handleTargetInput}/>
      </div>
    </>
  )
}

export default App
