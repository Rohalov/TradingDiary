import { useState } from "react";
import './ForgotModal.css'

function ForgotModal({ closeModal }) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [emailSent, setEmailSent] = useState(true);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const emailForm =
        <div>
            <div className="modal-label">
                Забули пароль?
            </div>

            <div className="modal-subtitle">
                Введіть адрес електроної пошти. Ви отримаєте листа з інструкціями.
            </div>

            <div className="input-block">
                <div className="label-block">
                    Введіть поштову адресу
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange}></input>
                </div>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="send-button">
                <button onClick={send}>Відправити</button>
            </div>
        </div>;


    const emailSentBox =
        <div className="email-result-box">
            <div className="email-icon">
            </div>
            <div className="label-block">
                Лист з інструкціями відправлено на адресу: {email}
            </div>
        </div>

    return (
        <div className="modal-container">
            <div className="forgot-modal">
                <div className="close-button">
                    <button onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>

                {emailSent ? emailSentBox : emailForm}

            </div>
        </div>
    )

    async function send(e) {
        e.preventDefault();
        const responce = await fetch('/api/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        const data = await responce.text();
        if (responce.status == 200) {
            setEmailSent(true);
        } else {
            setErrorMessage(data);
        }
    }
}

export default ForgotModal
