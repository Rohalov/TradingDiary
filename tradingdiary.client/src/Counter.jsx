import { useState, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

function Counter() {
    const [riskReward, setRiskReward] = useState();
    const [counterData, setCounterData] = useState({
        entryPoint: "",
        takeProfit: "",
        stopLoss: ""
    });
    const [errorMessageIsOpen, setErrorMessageIsOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCounterData({ ...counterData, [name]: value });
    };

    return (
        <div className="counter-container">
            <form onSubmit={count}>
                <div className="input-box">
                    <label>Точка входу</label>
                    <input type="text" name="entryPoint" required
                        onChange={handleInputChange} />
                </div>

                <div className="input-box">
                    <label>Тейк-профіт</label>
                    <input type="text" name="takeProfit" required
                        onChange={handleInputChange} />
                </div>

                <div className="input-box">
                    <label>Стоп-лос або ціна ліквідації</label>
                    <input type="text" name="stopLoss" required
                        onChange={handleInputChange} />
                </div>

                {errorMessageIsOpen &&
                    <div className="error-message-container">
                        Введіть числові значення(1.01)
                    </div>
                }

                <div className="count-button">
                    <button type="submit">Розрахувати</button>
                </div>
            </form>

            <div className="result-block">
                <p>
                    RR: {riskReward == undefined ? "" : riskReward}
                </p>
            </div>
        </div>
    )

    async function count(e) {
        e.preventDefault();
        if (isValidCounterData()) {
            const responce = await fetch('https://localhost:7049/api/Trades/CountRiskReward', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(counterData)
            })

            var rr = await responce.json();
            console.log(rr);
            setRiskReward(rr);
            setErrorMessageIsOpen(false);
        } else {
            setErrorMessageIsOpen(true);
        }
    }

    function isValidCounterData() {
        if (isNaN(counterData.entryPoint) || isNaN(counterData.takeProfit) || isNaN(counterData.stopLoss)) {
            return false;
        }
        return true
    }
}

export default Counter
