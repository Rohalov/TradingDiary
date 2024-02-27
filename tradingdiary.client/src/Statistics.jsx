import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

function Statistics() {
    const [stat, setStat] = useState();
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getStat();
    })

    const dateForm =
        <div className="date-container">
            <div className="input-date-block">
                <label htmlFor="date-from">Від:</label>
                <input type="date" name="date-from"></input>
            </div>

            <div className="input-date-block">
                <label htmlFor="date-to">До:</label>
                <input type="date" name="date-to"></input>
            </div>
        </div>

    return (
        <div>
            <div className="menu">
                <button>Тиждень</button>
                <button>Місяць</button>
                <button>Всі угоди</button>
                <button>Обрати період</button>
            </div>

            <div>
               
            </div>
        </div>
    )

    async function getStat() {
        const responce = await fetch('', {
            method: '',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify()
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
    }
}

export default Statistics
