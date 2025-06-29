import { useState } from 'react'
import './App.css'
import TargetInput from './components/TargetInput'
import CoinDenominations from './components/CoinDenominations';

function App() {
  const [target, setTarget] = useState('');
  const [selectedCoins, setSelectedCoins] = useState([]);


  const COINS_DENOMINATIONS = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

  function handleTargetInput(value) {
    // Allow empty or a number with max 2 decimals
    if (value === '' || /^\d{1,5}(\.\d{0,2})?$/.test(value)) {
      setTarget(value);
    }
  }

  function handleCoinClick(coin) {
    const index = selectedCoins.indexOf(coin);
    if (index < 0) {
      selectedCoins.push(coin);
    } else {
      selectedCoins.splice(index, 1);
    }
    setSelectedCoins([...selectedCoins]);
  };

  return (
    <>
      <div className="container">
        <h1>Coin Change Calculator</h1>
        <p>By Kin Seng</p>
          <div className="mt-5 bg-blue-50 p-2 rounded-3xl drop-shadow-2xl border-gray-200 border-2">
            <TargetInput target={target} handleTargetInput={handleTargetInput}/> <br />
            <CoinDenominations coins={COINS_DENOMINATIONS} selectedCoins={selectedCoins} handleCoinClick={handleCoinClick} />
          </div>
      </div>
    </>
  )
}

export default App
