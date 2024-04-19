
function EditFactorModal({ closeModal, handleSubmit, handleNameChange, name }) {

    return (
        <div className="modal-container">
            <div className="edit-modal">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="factor" value={name} onChange={handleNameChange} required></input>
                    <button type="submit">Edit</button>
                    <button onClick={closeModal}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditFactorModal