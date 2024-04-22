import directionValues from '../../data/directions.json';
import resultValues from '../../data/results.json';
import CloseIcon from '../../components/Icons/CloseIcon/CloseIcon';
import EditIcon from '../../components/Icons/EditIcon/EditIcon';
import './TradesTable.css';

function TradesTable({ handleEdit, handleDelete, trades }) {

    return (
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
                            <button className="table-btn" id="edit-btn" onClick={() => handleEdit(index)}>
                                <EditIcon height="24" width="24" />
                            </button>
                            <button className="table-btn" id="delete-btn" onClick={() => handleDelete(trade.id)}>
                                <CloseIcon height="24" width="24" />
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default TradesTable