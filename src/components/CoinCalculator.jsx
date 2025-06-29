import React, { useState } from 'react';

const COINS = [0.01, 0.05, 0.1, 0.2, 1, 5, 10, 100, 1000];

export default function CoinCalculator() {
  const [target, setTarget] = useState('');
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle checkbox toggle
  const toggleCoin = (coin) => {
    setSelectedCoins((prev) =>
      prev.includes(coin)
        ? prev.filter((c) => c !== coin)
        : [...prev, coin]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const parsedTarget = parseFloat(target);
    if (isNaN(parsedTarget) || parsedTarget <= 0) {
      setError('Please enter a valid positive target.');
      return;
    }
    if (selectedCoins.length === 0) {
      setError('Please select at least one coin denomination.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/coin/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: parsedTarget,
          coinDenominations: selectedCoins,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.text()

      if (data == "") {
        setError('No solution found with selected coins.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Failed to fetch result: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Coin Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Target amount:
          <input
            type="number"
            step="0.01"
            min="0"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />
        </label>

        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Select Coin Denominations:</legend>
          {COINS.map((coin) => (
            <label key={coin} style={{ display: 'block', marginBottom: '0.25rem' }}>
              <input
                type="checkbox"
                value={coin}
                checked={selectedCoins.includes(coin)}
                onChange={() => toggleCoin(coin)}
              />
              {' '}{coin.toFixed(2)}
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.5rem 1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Coins Used:</h3>
          <ul>
            {result.map((coin, idx) => (
              <li key={idx}>{coin.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
