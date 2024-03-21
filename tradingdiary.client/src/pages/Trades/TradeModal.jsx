import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import './TradeModal.css'

function TradeModal({ closeModal, onSubmit, defaultValue }) {
    const [entryFactors, setEntryFactors] = useState([]);
    const [modalData, setModalData] = useState(
        defaultValue || {
            pair: "",
            direction: "0",
            date: "",
            entryFactors: [],
            riskReward: "",
            riskPercent: "",
            result: "0",
            profitLoss: ""
        }
    );
    const [pairs, setPairs] = useState([]);
    const [factorsModalOpen, setFactorsModalOpen] = useState(false);
    const [token,] = useContext(AuthContext);
    const date = modalData.date.split('T')[0];

    useEffect(() => {
        getAllTradingPair();
        getEntryFactors();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };

    const handleChooseFactor = (e) => {
        const { name } = e.target;
        const value = e.target.checked;
        const ef = modalData.entryFactors;
        if (value) {
            ef.push(name);
            setModalData({ ...modalData, entryfactors: ef });
        } else {
            ef.pop(name);
            setModalData({ ...modalData, entryfactors: ef });
        }
    }

    const entryFactorsModal =
        <div className="modal-container">
            <div className="factors-modal">
                {entryFactors.map((factor) =>
                    <div className="factor-checkbox" key={factor.id}>
                        <label htmlFor={factor.name}>{factor.name}</label>
                        {
                            <input type="checkbox" name={factor.name} onChange={handleChooseFactor} checked={isChecked(factor.name)}></input>
                        }
                    </div>
                )}
                <button onClick={() => setFactorsModalOpen(false)}>Підтвердити</button>
            </div>
        </div>

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="close-button">
                    <button onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="pair">Торгова пара</label>
                        <select name="pair" onChange={handleInputChange} value={modalData.pair}>
                            {pairs.map((pair) =>
                                <option key={pair.id} value={pair.name}>{pair.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="direction">Напрямок руху</label>
                        <select name="direction" onChange={handleInputChange} value={modalData.direction}>
                            <option value="0">Long</option>
                            <option value="1">Short</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Дата</label>
                        <input type="date" name="date" onChange={handleInputChange} value={date} required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="entryFactors">Фактори входу</label>
                        <button onClick={() => setFactorsModalOpen(true)}>Обрати</button>
                        {factorsModalOpen && entryFactorsModal}
                    </div>

                    <div className="form-group">
                        <label htmlFor="riskReward">RR</label>
                        <input type="number" step="0.1" name="riskReward" onChange={handleInputChange} value={modalData.riskReward} required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="riskPercent">Ризик у % від деп.</label>
                        <input type="number" min="0" max="100" step="0.1" name="riskPercent" onChange={handleInputChange} value={modalData.riskPercent} required></input>%
                    </div>

                    <div className="form-group">
                        <label htmlFor="result">Результат</label>
                        <select name="result" onChange={handleInputChange} value={modalData.result}>
                            <option value="0">Прибуток</option>
                            <option value="1">Збиток</option>
                            <option value="2">Беззбиток</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profitLoss">Прибуток у %| P&L</label>
                        <input type="number" min="-100" step="0.1" name="profitLoss" onChange={handleInputChange} value={modalData.profitLoss} required></input>%
                    </div>

                    <div className="submit-button">
                        {defaultValue
                            ? <button type="submit">Змінити</button>
                            : <button type="submit">Додати</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        if (modalData.pair == "") {
            modalData.pair = pairs[0].name;
        }
        onSubmit(modalData);
        closeModal();
    }

    function isChecked(value) {
        return modalData.entryFactors.includes(value);
    }

    async function getEntryFactors() {
        const responce = await fetch('/api/EntryFactors', {
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
        const responce = await fetch('/api/TradingPairs', {
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
