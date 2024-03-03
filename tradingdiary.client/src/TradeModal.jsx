import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext';
import './TradeModal.css'

function TradeModal({ closeModal }) {
    const [entryFactors, setEntryFactors] = useState([]);
    const [modalData, setModalData] = useState(
        {
            pair: "",
            direction: "0",
            date: "",
            entryfactors: ["sfp"],
            riskreward: "0",
            riskpercent: "0",
            result: "0",
            profitloss: "0"
        }
    );
    const [pairs, setPairs] = useState([]);
    const [factorsModalOpen, setFactorsModalOpen] = useState(false);
    const [token,] = useContext(AuthContext);

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
        const ef = modalData.entryfactors;
        if (value) {
            ef.push(name);
            setModalData({ ...modalData, entryfactors: ef });
        } else {
            ef.pop(name);
            setModalData({ ...modalData, entryfactors: ef });
        }
    }

    const entryFactorsModal =
        <div className="factors-container">
            {entryFactors.map((factor) =>
                <div className="factor-checkbox" key={factor.id}>
                    <label htmlFor={factor.name}>{factor.name}</label>
                    {isChecked(factor.name) === true
                        ? <input type="checkbox" name={factor.name} onChange={handleChooseFactor} checked></input>
                        : <input type="checkbox" name={factor.name} onChange={handleChooseFactor}></input>
                    }
                </div>
            )}
            <button onClick={() => setFactorsModalOpen(false)}>Підтвердити</button>
        </div>

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
                        <select name="direction" onChange={handleInputChange}>
                            <option value="0">Long</option>
                            <option value="1">Short</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Дата</label>
                        <input type="date" name="date" onChange={handleInputChange} required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="entryfactors">Фактори входу</label>
                        <button onClick={() => setFactorsModalOpen(true)}>Обрати</button>
                        {factorsModalOpen && entryFactorsModal}
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
                        <select name="result" onChange={handleInputChange}>
                            <option value="0">Прибуток</option>
                            <option value="1">Збиток</option>
                            <option value="2">Беззбиток</option>
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

    async function isChecked(value) {
        if (modalData.entryfactors.indexOf(value) == -1) {
            return false;
        } else {
            return true;
        }
    }

    async function addTrade() {
        const responce = await fetch('https://localhost:7049/api/Trades/AddTrade', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modalData)
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
