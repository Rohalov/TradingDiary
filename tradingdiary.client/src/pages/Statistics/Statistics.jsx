import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Statistics.css'
import Navbar from '../../components/Navbar/Navbar';
import StackedBarChar from './Charts/StackedBarChart';
import TradeBox from './TradeBox';
import { service } from '../../api/StatisticsService';
import DateForm from './DateForm';

function Statistics() {
    const [stat, setStat] = useState("");
    const [dateFormOpen, setDateFormOpen] = useState(false);
    const [checkAuth] = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
        getStat();
    }, [])

    const handleData = (data) => {
        setStat(data);
    }

    return (
        <div className="container-stat">
            <Navbar />

            <div className="menu">
                <button onClick={() => getStat('week')}>Цей тиждень</button>
                <button onClick={() => getStat()}>Цей місяць</button>
                <button onClick={() => getStat('all')}>Всі угоди</button>
                <button onClick={() => setDateFormOpen(true)}>Обрати період</button>
                {dateFormOpen && <div className="date-form">
                    <DateForm closeDateForm={() => setDateFormOpen(false)}
                        setData={handleData}
                    />
                </div>
                }
            </div>

            <div className="main-content">
                <div className="date-block">
                    {stat === "" ? "..." : `${stat.from.split('T')[0]} : ${ stat.to.split('T')[0]}`}
                </div>

                <div className="statistic-grid">
                    <section>
                        <div id='stackedbar' className='section-block'>
                            <StackedBarChar
                                profit={stat.profit}
                                loss={stat.loss}
                            />
                        </div>
                    </section>

                    <section>
                        <div className='section-grid'>
                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                        <div className='base-text'>
                                            Загальна кількість угод
                                        </div>
                                        <div className='main-text'>
                                            {stat.total}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                        <div className='base-text'>
                                            Результат
                                        </div>
                                        <div className='main-text'>
                                            {stat.profitLoss}%
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                        <div className='base-text'>
                                            Середній RR
                                        </div>
                                        <div className='main-text'>
                                            {stat.avgRiskReward}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                        <div className='base-text'>
                                            Середній ризик на угоду
                                        </div>
                                        <div className='main-text'>
                                            {stat.avgRisk}%
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    <section>
                        <div className="section-block">
                            <div className="trade-card">
                                <div className='base-text'>
                                    Найкраща угода
                                </div>
                                <div className='result-block'>
                                    {stat != "" &&
                                        <TradeBox trade={stat.bestTrade} />
                                    }
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="section-block">
                            <div className="trade-card">
                                <div className='base-text'>
                                    Найгірша угода
                                </div>
                                <div className='result-block'>
                                    {stat != "" &&
                                        <TradeBox trade={stat.worstTrade} />
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )

        async function getStat(type) {
            let data;
            switch (type) {
                case 'week':
                    data = await service.getStatisticForWeek();
                    break;
                case 'all':
                    data = await service.getAllTimeStat();
                    break;
                default:
                    data = await service.getStatisticForMonth();
                    break;
            }
            setStat(data);
        }
    }

    export default Statistics
