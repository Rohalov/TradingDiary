import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import TradeModal from './TradeModal';
import Counter from './Counter';

function Trades() {
    const [trades, setTrades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [tradeData, setTradeData] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getTrades();
    }, []);

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
                    <th></th>
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
                        <td>
                            <button className="edit-btn" onClick={() => { setTradeData(trade); setEditModalOpen(true); }}>edit</button>
                            <button className="delete-btn" onClick={() => { setTradeData(trade); setConfirmModalOpen(true); }}>dlt</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    const confirmModal =
        <div className="confirm-modal">
            <p></p>
            <button onClick={() => { setConfirmModalOpen(false); deleteTrade(); }}>Confirm</button>
            <button onClick={() => setConfirmModalOpen(false)}>Cancel</button>
        </div>

    return (
        <div>
            <div className="top-header-block">
                <Link to="/statistics">
                    <button>Статистика</button>
                </Link>
            </div>

            <div className="main-section">
                {table}
                {confirmModalOpen && confirmModal}
            </div>

            <div className="add-button">
                <button onClick={() => setModalOpen(true)}>Додати</button>
            </div>

            {modalOpen && <TradeModal closeModal={() => { setModalOpen(false) }} />}

            <div className="riskreward-counter">
                <Counter />
            </div>
        </div>
    )

    async function deleteTrade() {
        const responce = await fetch(`https://localhost:7049/api/Trades/DeleteTrade?id=${tradeData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
    }

    async function updateTrade() {
        const trade = {
            pair: tradeData.pair,
            direction: tradeData.direction,
            entryFactors: tradeData.entryFactors,
            date: tradeData.date,
            riskReward: tradeData,
            riskPercent: tradeData.riskPercent,
            result: tradeData.result,
            profitLoss: tradeData.profitLoss
        };
        const responce = await fetch(`https://localhost:7049/api/Trades/UpdateTrade?id=${tradeData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trade)
        });
        const data = await responce.json();
        console.log(data);
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
