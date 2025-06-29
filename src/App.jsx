import { useState } from 'react'
import './App.css'
import TargetInput from './components/TargetInput'
import CoinDenominations from './components/CoinDenominations';
import Result from './components/Result';

function App() {
  const [target, setTarget] = useState('');
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [submittedTarget, setSubmittedTarget] = useState('');
  const [resultCoins, setResultCoins] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const COINS_DENOMINATIONS = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

  function handleTargetInput(value) {
    // Allow empty or a number with max 2 decimals
    if (value === '' || /^\d{1,5}(\.\d{0,2})?$/.test(value)) {
      setTarget(value);
    }
  }

  function handleCoinClick(coin) {
    // if coin is already in selectedCoins, add into array, otherwise remove from array
    const index = selectedCoins.indexOf(coin);
    if (index < 0) {
      selectedCoins.push(coin);
    } else {
      selectedCoins.splice(index, 1);
    }

    // set new array as selectedCoins
    setSelectedCoins([...selectedCoins]);
  };

  const isDenominationSelected = selectedCoins.length > 0;

  async function handleSubmitBtn(e) {
    e.preventDefault();

    // reset error and resultCoins
    setError(null);
    setResultCoins(null);
    setSubmittedTarget('');

    if (!isDenominationSelected) {
      setError("Please select at least 1 Coin Denomination")
      return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/coin/calculate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                target: target,
                coinDenominations: selectedCoins
            })
        });
        
        // if server returns 422 (Unprocessable entity) from validation error
        if (response.status === 422) {
          const errorData = await response.json();
          setError(errorData.errors);
          return;
        }

        // other errors
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const dataText = await response.text();
        
        // if response is blank
        if (dataText == "") {
          setError("No solutions found");
          return;
        }
        
        const dataJson = JSON.parse(dataText);

        setResultCoins(dataJson);
        setSubmittedTarget(target);
    } catch (err) {
        setError(err.message);
    }
  }

  const submitBtn = () => {
    return (
      <>
        <p className='mt-4'>3. <b>Submit</b> when you are ready!</p>
        <button
          className='rounded px-4 py-2 border-gray-400 border-1 w-full text-sm font-medium transition-colors hover:bg-blue-100 active:bg-gray-400'
          type="submit"
        >
          Submit
        </button>
      </>
    )
  }

  return (
    <>
      <div className="container">
        <h1>Coin Change Calculator</h1>
        <p>By Kin Seng</p>
          <div className="mt-5 bg-blue-50 p-2 rounded-3xl drop-shadow-2xl border-gray-200 border-2">
            <form onSubmit={handleSubmitBtn}>
              <TargetInput target={target} handleTargetInput={handleTargetInput}/> <br />
              <CoinDenominations coins={COINS_DENOMINATIONS} selectedCoins={selectedCoins} handleCoinClick={handleCoinClick} />
              {submitBtn()}
            </form>
            <Result target={submittedTarget} error={error} resultCoins={resultCoins}/>
          </div>
      </div>
    </>
  )
}

export default App
