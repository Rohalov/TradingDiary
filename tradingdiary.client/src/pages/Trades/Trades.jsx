import { useContext, useEffect, useState } from 'react';
import { service } from '../../api/tradesService';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import TradeModal from './TradeModal';
import './Trades.css';
import TradesTable from './TradesTable';
import Pagination from './Pagination';

function Trades() {
    const [trades, setTrades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [currentTradeId, setCurrentTradeId] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [checkAuth] = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();


    useEffect(() => {
        checkAuth();
        updateData(currentPage);
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

    const handleDeleteRow = (index) => {
        setCurrentTradeId(index);
        setConfirmModalOpen(true);
    }

    return (
        <div className='trades-container'>
            <div className="top-header-block">
                <Navbar />
            </div>

            <div className="main-section">
                <TradesTable
                    handleEdit={handleEditRow}
                    handleDelete={handleDeleteRow}
                    trades={trades}
                />

                {confirmModalOpen && <ConfirmModal
                    closeModal={() => setConfirmModalOpen(false)}
                    handleSubmit={handleDeleteTrade}
                    title='Ви справді хочете видалити цей запис?'
                />}
            </div>

            <div className="add-button">
                <button onClick={() => setModalOpen(true)}>Додати</button>
            </div>

            <div className="pagination-block">
                {numberOfPages != undefined &&
                    <Pagination currPage={currentPage}
                        pages={numberOfPages}
                        handleChange={updateData}
                    />
                }
            </div>

            {modalOpen && <TradeModal
                closeModal={() => { setModalOpen(false); setTradeData(null); }}
                onSubmit={handleSubmit}
                defaultValue={tradeData}
            />}
        </div>
    )

    async function handleSubmit(trade) {
        if (tradeData == null) {
            await service.addTrade(trade);
        } else {
            await service.updateTrade(currentTradeId, trade);
        }
        await updateData(currentPage);
    }

    async function handleDeleteTrade() {
        await service.deleteTrade(currentTradeId);
        await updateData(currentPage);
    }

    async function updateData(page) {
        const data = await service.getTrades(page);
        setTrades(data.trades);
        setNumberOfPages(data.pages);
        setCurrentPage(page);
    }
}

export default Trades
