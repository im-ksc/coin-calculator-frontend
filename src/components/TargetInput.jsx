function TargetInput({ target, handleTargetInput }) {

    return (
        <>
            <label>
                <p>1. Input <b>Target</b> amount between <u>0.00 to 10000.00</u></p>
                <input
                    className="text-center border rounded-xl p-2 mt-1"
                    type="number"
                    step="0.01"
                    min="0"
                    value={target}
                    onChange={(e) => handleTargetInput(e.target.value)}
                    required
                />
            </label>
        </>
    )
}

export default TargetInput