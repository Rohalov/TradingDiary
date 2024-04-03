import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TradeModal from './TradeModal';
import Counter from './Counter';
import Navbar from '../../components/Navbar/Navbar';
import directionValues from '../../data/directions.json'
import resultValues from '../../data/results.json'
import './Trades.css';

function Trades() {
    const [trades, setTrades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [currentTradeId, setCurrentTradeId] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [token, checkAuth] = useContext(AuthContext);


    useEffect(() => {
        checkAuth();
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
                    <th className="stickyTop">#</th>
                    <th className="stickyTop" id='text-start'>Торгова пара</th>
                    <th className="stickyTop">Напрямок</th>
                    <th className="stickyTop">Дата</th>
                    <th className="stickyTop">Фактори входу</th>
                    <th className="stickyTop" id='text-end'>RR</th>
                    <th className="stickyTop" id='text-end'>Ризик, %</th>
                    <th className="stickyTop" >Результат</th>
                    <th className="stickyTop" id='text-end'>Прибуток, %</th>
                    <th className="stickyTop"></th>
                </tr>
            </thead>
            <tbody>
                {trades.map((trade, index) =>
                    <tr key={trade.id}>
                        <td>{index + 1}</td>
                        <td id='text-start'>{trade.pair}</td>
                        <td style={{ color: trade.direction == 0 ? '#16c784' : '#ea3943' }}>{directionValues[trade.direction]}</td>
                        <td>{trade.date.split('T')[0]}</td>
                        <td>{trade.entryFactors.map(factor => factor.name)}</td>
                        <td id='text-end'>{trade.riskReward}</td>
                        <td id='text-end'>{trade.riskPercent}</td>
                        <td style={{ color: trade.result == 0 ? '#16c784' : trade.result == 1 ? '#ea3943' : '#FFF' }}>{resultValues[trade.result]}</td>
                        <td id='text-end'>{trade.profitLoss}</td>
                        <td id='text-end'>
                            <button className="table-btn" id="edit-btn" onClick={() => handleEditRow(index)}>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </button>
                            <button className="table-btn" id="delete-btn" onClick={() => { setCurrentTradeId(trade.id); setConfirmModalOpen(true); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
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
        <div className='trades-container'>
            <div className="top-header-block">
                <Navbar />
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
        const responce = await fetch(`/api/Trades/${currentTradeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
    }

    async function addTrade(trade) {
        const responce = await fetch('/api/Trades', {
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
        const responce = await fetch(`/api/Trades/${currentTradeId}`, {
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
        const responce = await fetch('/api/Trades', {
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
