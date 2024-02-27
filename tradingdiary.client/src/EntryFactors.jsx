import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext';

function EntryFactors() {
    const [factors, setFactors] = useState();
    const [newFactor, setNewFactor] = useState();
    const [token,] = useContext(AuthContext);

    useEffect(() => {
        getEntryFactors();
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFactor({ ...newFactor, [name]: value });
    };

    const handleEditFactor = (e) => {

    };

    const handleDeleteFactor = (e) => {

    };

    const confirmModel =
        <div className="confirm-modal">
            <p></p>
            <button>Confirm</button>
            <button>Cancer</button>
        </div>

    return (
        <div className="container">
            <div className="show-block">
                {factors.map((index, factor) =>
                    <div key={index} className="factor-block">
                        {factor}
                        <button className="edit-btn" onClick={handleEditFactor}>Edit</button>
                        <button className="delete-btn" onClick={handleDeleteFactor}>Del</button>
                    </div>
                )}
            </div>

            { }

            <div className="add-block">
                <form>
                    <div className="input-block">
                        <input type="text" name="factor" onChange={handleInputChange} required></input>
                    </div>

                    <div className="add-btn">
                        <button type="submit" onClick={addFactor}>Додати</button>
                    </div>
                </form>
            </div>
        </div>
    )

    async function getEntryFactors() {
        const responce = await fetch('https://localhost:7049/api/EntryFactors/GetAllUserEntryFactors', {
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

    async function addFactor() {
        const responce = await fetch('', {
            method: '',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newFactor)
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
    }

    async function deleteFactor() {
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


    async function updateFactor() {
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

export default EntryFactors
