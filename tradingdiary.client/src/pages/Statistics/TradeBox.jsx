import './TradeBox.css';

function TradeBox({ trade }) {

    const contents = trade === null
        ? <div className='text-block'>-</div>
        : <div className="grid-box">
            <div className="grid-item title-text">
                Дата
            </div>

            <div className="grid-item title-text">
                Торгова пара
            </div>

            <div className="grid-item title-text" id='text-center'>
                RiskReward
            </div>

            <div className="grid-item title-text" id='text-center'>
                Результат
            </div>

            <div className="grid-item">
                {trade.date.split('T')[0]}
            </div>

            <div className="grid-item">
                {trade.pair}
            </div>

            <div className="grid-item" id='text-center'>
                {trade.riskReward}
            </div>

            <div className="grid-item" id='text-center'
                style={{ color: trade.profitLoss > 0 ? '#16c784' : '#ea3943' }}
            >
                {trade.profitLoss}%
            </div>
        </div>;


    return (
        <div className="trade-box">
            {contents}
        </div>
    )
}

export default TradeBox