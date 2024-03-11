import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

function Statistics() {
    const [stat, setStat] = useState();
    const [date, setDate] = useState({
        from: "",
        to: ""
    });
    const [dateFormOpen, setDateFormOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    useEffect(() => { 
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDate({ ...date, [name]: value });
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
                    <button type="submit" onClick={() => { setDateFormOpen(false); }}>Підтвердити</button>
                </div>
            </form>
        </div>

    return (
        <div>
            <div className="menu">
                <button>Тиждень</button>
                <button>Місяць</button>
                <button>Всі угоди</button>
                <button onClick={() => setDateFormOpen(true)}>Обрати період</button>
                {dateFormOpen && dateForm}
            </div>

            <div>

            </div>
        </div>
    )

    async function getCustomStat() {
        const responce = await fetch('', {
            method: '',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
    }
}

export default Statistics
