import './ConfirmModal.css'

function ConfirmModal({ closeModal, handleSubmit, title }) {

    return (
        <div className="modal-container">
            <div className="confirm-modal">
                <p>{title}</p>
                <button className='confirm-btn' onClick={() => { handleSubmit(); closeModal(); }}>Так</button>
                <button className='cancel-btn' onClick={closeModal}>Ні</button>
            </div>
        </div>
    )
}

export default ConfirmModal