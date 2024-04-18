import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';


function EntryFactors() {
    const [factors, setFactors] = useState([]);
    const [newFactor, setNewFactor] = useState();
    const [factorData, setFactorData] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getEntryFactors();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFactor({ ...newFactor, [name]: value });
    };

    const handleFactorDataNameChange = (e) => {
        const { value } = e.target;
        setFactorData({ ...factorData, name: value })
    };

    const handleEditFactor = () => {
        updateFactor();
        setEditModalOpen(false);
    };

    const editModal =
        <div className="edit-modal">
            <form onSubmit={handleEditFactor}>
                <input type="text" name="factor" value={factorData == undefined ? "" : factorData.name} onChange={handleFactorDataNameChange} required></input>
                <button type="submit">Edit</button>
                <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </form>
        </div>

    return (
        <div className="factors-container">
            <div className="show-block">
                {factors.map(factor =>
                    <div key={factor.id} className="factor-block">
                        {factor.name}
                        <button className="edit-btn" onClick={() => { setEditModalOpen(true); setFactorData(factor); }}>Edit</button>
                        <button className="delete-btn" onClick={() => { setConfirmModalOpen(true); setFactorData(factor); }}>Del</button>
                    </div>
                )}
            </div>

            {editModalOpen && editModal}
            {confirmModalOpen && <ConfirmModal
                closeModal={() => setConfirmModalOpen(false)}
                handleSubmit={deleteFactor}
                title='Видалити фактор?'
            />}

            <div className="add-block">
                <form>
                    <div className="input-block">
                        <input type="text" name="name" onChange={handleInputChange} required></input>
                    </div>

                    <div className="add-btn">
                        <button type="submit" onClick={addFactor}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )

    async function getEntryFactors() {
        const responce = await fetch('/api/EntryFactors/GetAllUserEntryFactors', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setFactors(data);
    }

    async function addFactor(e) {
        e.preventDefault();
        const responce = await fetch('/api/EntryFactors/AddEntryFactor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newFactor)
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        getEntryFactors();
    }

    async function deleteFactor() {
        const responce = await fetch(`/api/EntryFactors/DeleteEntryFactor?factorId=${factorData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        getEntryFactors();
    }


    async function updateFactor() {
        const name = {
            name: factorData.name
        };
        const responce = await fetch(`/api/EntryFactors/UpdateEntryFactor?factorId=${factorData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(name)
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        getEntryFactors();
    }
}

export default EntryFactors
