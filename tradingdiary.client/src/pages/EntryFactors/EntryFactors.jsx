import { useState, useEffect } from 'react'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import service from '../../api/EntryFactorsService';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import EditFactorModal from './EditFactorModal';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import './EntryFactors.css';


function EntryFactors() {
    const [factors, setFactors] = useState([]);
    const [newFactor, setNewFactor] = useState();
    const [factorData, setFactorData] = useState();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        getFactors();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFactor({ ...newFactor, [name]: value });
    };

    const handleFactorDataNameChange = (e) => {
        const { value } = e.target;
        setFactorData({ ...factorData, name: value })
    };

    return (
        <div className="settings-container">
            <div className="header">
                <Navbar />
            </div>

            <div className="main-block">
                <Sidebar active="factors" />

                <div className="box">
                    <div className="box-header">
                        Фактори входу
                    </div>

                    <div className="factors-container">
                        {factors.map((factor, index) =>
                            <div key={index} className="factor-grid">
                                <div className="grid-item">
                                    {index + 1}
                                </div>

                                <div className="grid-item">
                                    {factor.name}
                                </div>

                                <div className="grid-item btn">
                                    <button className="grid-btn edit-btn" onClick={() => { setEditModalOpen(true); setFactorData(factor); }}>
                                        <MdEdit size={24} />
                                    </button>
                                </div>

                                <div className="grid-item btn">
                                    <button className="grid-btn delete-btn" onClick={() => { setConfirmModalOpen(true); setFactorData(factor); }}>
                                        <MdDeleteOutline size={24} />
                                    </button>
                                </div>
                            </div>
                        )}


                        {editModalOpen && <EditFactorModal
                            closeModal={() => setEditModalOpen(false)}
                            handleSubmit={handleEditFactor}
                            handleNameChange={handleFactorDataNameChange}
                            name={factorData.name}
                        />}

                        {confirmModalOpen && <ConfirmModal
                            closeModal={() => setConfirmModalOpen(false)}
                            handleSubmit={handleDeleteFactor}
                            title='Видалити фактор?'
                        />}

                        <div className="add-block">
                            <form className='add-form'>
                                <div className="add-label">
                                    Додати фактори
                                </div>

                                <div className="input-block">
                                    <input type="text" name="name" onChange={handleInputChange} required></input>
                                </div>

                                <button className="add-btn" type="submit" onClick={addFactor}>Додати</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    async function getFactors() {
        const data = await service.getEntryFactors();
        setFactors(data);
    }

    async function addFactor(e) {
        e.preventDefault();
        await service.addFactor(newFactor);
        await getFactors();
    }

    async function handleEditFactor() {
        await service.updateFactor(factorData.id, factorData.name);
        setEditModalOpen(false);
        await getFactors();
    }

    async function handleDeleteFactor() {
        await service.deleteFactor(factorData.id);
        await getFactors();
    }
}

export default EntryFactors
