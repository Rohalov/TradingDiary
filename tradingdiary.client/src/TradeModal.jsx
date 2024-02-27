import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext';
import './TradeModal.css'

function TradeModal({ closeModal }) {
    const [entryFactors, setEntryFactors] = useState([]);
    const [modelData, setModelData] = useState(
        {
            pair: "",
            direction: 0,
            date: "",
            entryfactors: [],
            riskreward: 0,
            riskpercent: 0,
            result: 0,
            profitloss: 0
        }
    );
    const [pairs, setPairs] = useState([]);
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getAllTradingPair();
        getEntryFactors();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModelData({ ...modelData, [name]: value });
    };

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="close-button">
                    <button onClick={closeModal}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="pair">Торгова пара</label>
                        <select name="pair">
                            {pairs.map((pair) =>
                                <option key={pair.id} value={pair.name}>{pair.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="direction">Напрямок руху</label>
                        <select name="direction" required>
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Дата</label>
                        <input type="date" name="date" onChange={handleInputChange} required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="entryFactors">Фактори входу</label>
                        {entryFactors.map((factor) =>
                            <div className="factor-checkbox" key={factor.id}>
                                <label htmlFor={factor.name}>{factor.name}</label>
                                <input type="checkbox" name={factor.name}></input>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="riskreward">RR</label>
                        <input type="number" step="0.1" name="riskreward" onChange={handleInputChange} required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="riskpercent">Ризик у % від деп.</label>
                        <input type="number" min="0" max="100" step="0.1" name="riskpercent" onChange={handleInputChange} required></input>%
                    </div>

                    <div className="form-group">
                        <label htmlFor="result">Результат</label>
                        <select name="result">
                            <option value="profit">Прибуток</option>
                            <option value="loss">Збиток</option>
                            <option value="breakeven">Беззбиток</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profitloss">Прибуток у %| P&L</label>
                        <input type="number" min="-100" step="0.1" name="profitloss" onChange={handleInputChange} required></input>%
                    </div>

                    <div className="submit-button">
                        <button type="submit">Додати</button>
                    </div>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        addTrade();
        closeModal();
    }

    async function addTrade() {
        const responce = await fetch('https://localhost:7049/api/Trades/AddTrade', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modelData)
        });
        const data = await responce.json();
        console.log(data);
    }

    async function getEntryFactors() {
        const responce = await fetch('https://localhost:7049/api/EntryFactors/GetAllUserEntryFactors', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        setEntryFactors(data);
        console.log(data);
    }

    async function getAllTradingPair() {
        const responce = await fetch('https://localhost:7049/api/TradingPairs/AllTradingPairs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setPairs(data);
    }
}

export default TradeModal
