import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Statistics.css'
import Navbar from '../../components/Navbar/Navbar';
import StackedBarChar from './Charts/StackedBarChart';

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
                <button onClick={getStatisticForWeek}>Цей тиждень</button>
                <button onClick={getStatisticForMonth}>Цей місяць</button>
                <button onClick={getAllTimeStat}>Всі угоди</button>
                <button onClick={() => setDateFormOpen(true)}>Обрати період</button>
                {dateFormOpen && dateForm}
            </div>

            <div className="main-content">
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
                                        <div>
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
                                        <div>
                                            {stat.profitLoss}%
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                        <div className='base-text'>
                                            Середній rr
                                        </div>
                                        <div>
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
                                        <div>
                                            {stat.avgRisk}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    <section>
                        <div className="section-block">
                            <div className="info-block">
                                <div className='base-text'>
                                    Найкраща угода
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="section-block">
                            <div className="info-block">
                                <div className='base-text'>
                                    Найгірша угода
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )

    async function getCustomStat() {
        const responce = await fetch(`/api/Statistics/Custom?from=${formData.from}&to=${formData.to}`, {
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
        const responce = await fetch('/api/Statistics/ForWeek', {
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
        const responce = await fetch('/api/Statistics/ForMonth', {
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
        const responce = await fetch('/api/Statistics/AllTime', {
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
