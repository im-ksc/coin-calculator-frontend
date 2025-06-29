function Result({ target, error, resultCoins }) {

    const resultOutput = () => {
        if (!resultCoins) return;
        
        // convert resultCoins into a map for easy viewing
        let uniqueCoins = new Set(resultCoins);
        let countOfCoins = {};

        for (let uniqueCoin of uniqueCoins) {
            countOfCoins[uniqueCoin]= resultCoins.filter(coin => coin == uniqueCoin).length;
        }

        return (
            <>  
                <div className="max-w-[400px]">
                    <p className="font-bold text-left mt-3">Coins output for target of <b><u>{target}</u></b>: </p>
                    <div className="grid grid-cols-4 gap-2">
                        {Object.entries(countOfCoins).map(([coin, count]) => (
                            <p key={coin} className="rounded p-1 bg-blue-100 w-full text-sm font-medium"><b><u>{coin}</u></b> x {count} coins</p>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    // if error, show error, else result
    return (
        <>
            {error && 
                <p className='max-w-[400px] text-red-600'>
                    {error}
                </p>
            }
            {resultOutput()}
        </>
    )
}

export default Result