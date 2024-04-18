import { useState, useEffect } from 'react';
import service from '../../api/EntryFactorsService';
import './FactorsModal.css';

function FactorsModal({ closeModal, handleChange, selectedFactors }) {
    const [entryFactors, setEntryFactors] = useState([]);

    useEffect(() => {
        getEntryFactors();
    }, [])

    return (
        <div className="modal-container">
            <div className="factors-modal">
                {entryFactors.map((factor) =>
                    <div className="factor-checkbox" key={factor.id}>
                        <label htmlFor={factor.name}>{factor.name}</label>
                        {
                            <input type="checkbox" name={factor.name} onChange={handleChange} checked={isChecked(factor.name)}></input>
                        }
                    </div>
                )}
                <button onClick={closeModal}>Підтвердити</button>
            </div>
        </div>
    )

    function isChecked(value) {
        return selectedFactors.includes(value);
    }

    async function getEntryFactors() {
        const factors = await service.getEntryFactors();
        setEntryFactors(factors);
    }
}

export default FactorsModal