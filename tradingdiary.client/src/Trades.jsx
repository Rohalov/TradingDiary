import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import TradeModal from './TradeModal';

function Trades() {
    const [trades, setTrades] = useState([]);
    const [counterData, setCounterData] = useState({
        entryPoint: 0,
        takeProfit: 0,
        stopLoss: 0
    });
    const [riskReward, setRiskReward] = useState();
    const [modelOpen, setModelOpen] = useState(false);

    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getTrades();
    },);

    const handleInputChangeCounter = (e) => {
        const { name, value } = e.target;
        setCounterData({ ...counterData, [name]: value });
    };

    const table =
        <table className="table">
            <thead>
                <tr>
                    <th>Торгова пара</th>
                    <th>Напрямок</th>
                    <th>Дата</th>
                    <th>Фактори входу</th>
                    <th>RR</th>
                    <th>Ризик, %</th>
                    <th>Результат</th>
                    <th>Прибуток, %</th>
                </tr>
            </thead>
            <tbody>
                {trades.map(trade =>
                    <tr key={trade.id}>
                        <td>{trade.pair}</td>
                        <td>{trade.direction}</td>
                        <td>{trade.date}</td>
                        <td>{trade.entryFactors.map(factor => factor.name)}</td>
                        <td>{trade.riskReward}</td>
                        <td>{trade.riskPercent}</td>
                        <td>{trade.result}</td>
                        <td>{trade.profitLoss}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    const counter =
        <div className="counter-container">
            <form onSubmit={count}>
                <div className="input-box">
                    <label>Точка входу</label>
                    <input type="number" name="entryPoint" required
                        onChange={handleInputChangeCounter} />
                </div>

                <div className="input-box">
                    <label>Тейк-профіт</label>
                    <input type="number" name="takeProfit" required
                        onChange={handleInputChangeCounter} />
                </div>

                <div className="input-box">
                    <label>Стоп-лос або ціна ліквідації</label>
                    <input type="number" name="stopLoss" required
                        onChange={handleInputChangeCounter} />
                </div>

                <div className="count-button">
                    <button type="submit">Розрахувати</button>
                </div>
            </form>

            <div className="result-block">
                <p>
                    RR: {riskReward}
                </p>
            </div>
        </div>;

    return (
        <div>
            <div className="top-header-block">
                <Link to="/statistics">
                    <button>Статистика</button>
                </Link>
            </div>

            <div className="main-section">
                {table}
            </div>

            <div className="add-button">
                <button onClick={() => setModelOpen(true)}>Додати</button>
            </div>

            {modelOpen && <TradeModal closeModal={() => { setModelOpen(false) }} />}

            <div className="riskreward-counter">
                {counter}
            </div>
        </div>
    )

    async function count(e) {
        e.preventDefault();

        const responce = await fetch('https://localhost:7049/api/Trades/CountRiskReward', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(counterData)
        })

        var rr = responce.text();
        console.log(rr);
        setRiskReward(rr);
    }

    async function getTrades() {
        console.log("getTrades");
        const responce = await fetch('https://localhost:7049/api/Trades/GetAllUserTrades', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await responce.json();
        setTrades(data);
        console.log(data);
    }
}

export default Trades
