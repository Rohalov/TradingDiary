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

            <div className="">
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
                                <div className=''>
                                    <div className="info-block">
                                        
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className='section-block'>
                                    <div className="info-block">
                                       
                                    </div>
                               </div>
                            </section>
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
