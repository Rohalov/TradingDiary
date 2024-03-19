import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TradeModal from './TradeModal';
import Counter from './Counter';
import Navbar from '../../components/Navbar/Navbar';
import './Trades.css';

function Trades() {
    const [trades, setTrades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [currentTradeId, setCurrentTradeId] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    const directionValues = { 0: "Long", 1: "Short" };
    const resultValues = { 0: "Прибуток", 1: "Збиток", 2: "Беззбиток" };

    useEffect(() => {
        getTrades();
    }, []);

    const handleEditRow = (index) => {
        setCurrentTradeId(trades[index].id);
        const trade = {
            pair: trades[index].pair,
            direction: trades[index].direction,
            entryFactors: [],
            date: trades[index].date,
            riskReward: trades[index].riskReward,
            riskPercent: trades[index].riskPercent,
            result: trades[index].result,
            profitLoss: trades[index].profitLoss
        };
        trades[index].entryFactors.forEach(f => {
            trade.entryFactors.push(f.name);
        });
        setTradeData(trade);
        setModalOpen(true);
    }

    const table =
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
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
                {trades.map((trade, index) =>
                    <tr key={trade.id}>
                        <td>{index + 1}</td>
                        <td>{trade.pair}</td>
                        <td>{directionValues[trade.direction]}</td>
                        <td>{trade.date.split('T')[0]}</td>
                        <td>{trade.entryFactors.map(factor => factor.name)}</td>
                        <td>{trade.riskReward}</td>
                        <td>{trade.riskPercent}</td>
                        <td>{resultValues[trade.result]}</td>
                        <td>{trade.profitLoss}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEditRow(index)}>edit</button>
                            <button className="delete-btn" onClick={() => { setCurrentTradeId(trade.id); setConfirmModalOpen(true); }}>dlt</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    const confirmModal =
        <div className="modal-container">
            <div className="confirm-modal">
                <p>Ви справді хочете видалити запис?</p>
                <button className='confirm-btn' onClick={() => { setConfirmModalOpen(false); deleteTrade(); }}>Так</button>
                <button className='cancel-btn' onClick={() => setConfirmModalOpen(false)}>Ні</button>
            </div>
        </div>

    return (
        <div className='container'>
            <div className="top-header-block">
                <Navbar/>
            </div>

            <div className="main-section">
                {table}
                {confirmModalOpen && confirmModal}
            </div>

            <div className="add-button">
                <button onClick={() => setModalOpen(true)}>Додати</button>
            </div>

            {modalOpen && <TradeModal
                closeModal={() => { setModalOpen(false); setTradeData(null); }}
                onSubmit={handleSubmit}
                defaultValue={tradeData}
            />}

            <div className="riskreward-counter">
                <Counter />
            </div>
        </div>
    )

    async function handleSubmit(trade) {
        if (tradeData == null) {
            addTrade(trade);
        } else {
            updateTrade(trade);
        }
    }

    async function deleteTrade() {
        const responce = await fetch(`/api/Trades/DeleteTrade?id=${currentTradeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
    }

    async function addTrade(trade) {
        const responce = await fetch('/api/Trades/AddTrade', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trade)
        });
        const data = await responce.json();
        console.log(data);
    }

    async function updateTrade(trade) {
        const responce = await fetch(`/api/Trades/UpdateTrade?id=${currentTradeId}`, {
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
        const responce = await fetch('/api/Trades/GetAllUserTrades', {
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