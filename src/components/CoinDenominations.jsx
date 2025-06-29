import { ButtonGroup } from "reactstrap"

function CoinDenominations({ coins, selectedCoins, handleCoinClick }) {
    return (
        <>
            <div className="mt-3">
                <p>2. Select <b>Coin Denominations</b> you want</p>
                    <ButtonGroup>
                        <div className="grid grid-cols-4 gap-2">
                            {coins.map((coin) => (
                                <button
                                      className={`rounded px-4 py-2 border-2 w-full text-sm font-medium transition-colors duration-100 ${
                                            selectedCoins.includes(coin)
                                            ? 'bg-gray-500 text-white'
                                            : 'bg-transparent text-gray-800 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    outline
                                    onClick={() => handleCoinClick(coin)}
                                    key={coin}
                                    >
                                    {coin}
                                </button>
                            ))}
                        </div>
                    </ButtonGroup>
            </div>
        </>
    )
}

export default CoinDenominations