import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Statistics.css'
import Navbar from '../../components/Navbar/Navbar';

function Statistics() {
    const [stat, setStat] = useState("");
    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });
    const [dateFormOpen, setDateFormOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getStatisticForMonth();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const dateForm =
        <div className="date-container">
            <form>
                <div className="input-date-block">
                    <label htmlFor="from">Від:</label>
                    <input type="date" name="from" onChange={handleInputChange} required></input>
                </div>

                <div className="input-date-block">
                    <label htmlFor="to">До:</label>
                    <input type="date" name="to" onChange={handleInputChange} required></input>
                </div>

                <div className="submit-btn">
                    <button type="submit" onClick={() => { setDateFormOpen(false); getCustomStat(); }}>Підтвердити</button>
                </div>
            </form>
        </div>

    return (
        <div className="container-stat">
            <Navbar />

            <div className="menu">
                <button onClick={getStatisticForWeek}>Тиждень</button>
                <button onClick={getStatisticForMonth}>Місяць</button>
                <button onClick={getAllTimeStat}>Всі угоди</button>
                <button onClick={() => setDateFormOpen(true)}>Обрати період</button>
                {dateFormOpen && dateForm}
            </div>

            <div className="main">
                <div>

                </div>
                <section>
                    <div className="info-block">
                        Загальна кількість
                        {stat.total}
                    </div>
                    <div className="info-block">
                        Успішних: {stat.profit}
                    </div>
                    <div className="info-block">
                        Збиткових: {stat.loss}
                    </div>
                    <div className="info-block">
                        P&L: {stat.profitLoss}
                    </div>
                </section>
                <section>
                    <div className="info-block">
                        Найкраща угода
                    </div>
                </section>
                <section>
                    <div className="info-block">
                        Найгірша угода
                    </div>
                </section>
                <section>
                    <div className="info-block" id="two">
                        Середній rr: {stat.avgRiskReward}
                    </div>
                    <div className="info-block" id="two">
                        Середній ризик: {stat.avgRisk}
                    </div>
                </section>
                <section>
                    <div className="info-block" id='two'>
                        Найкращий актив: {stat.bestTradingPair}
                    </div>
                    <div className="info-block" id='two'>
                        Найгірший актив: {stat.worstTradingPair}
                    </div>
                </section>
            </div>
        </div>
    )

    async function getCustomStat() {
        const responce = await fetch(`/api/Statistics/GetStatistic?from=${formData.from}&to=${formData.to}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setStat(data);
    }

    async function getStatisticForWeek() {
        const responce = await fetch('/api/Statistics/GetStatisticsForWeek', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setStat(data);
    }

    async function getStatisticForMonth() {
        const responce = await fetch('/api/Statistics/GetStatisticsForMonth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setStat(data);
    }

    async function getAllTimeStat() {
        const responce = await fetch('/api/Statistics/GetStatisticsAllTime', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setStat(data);
    }
}

export default Statistics
