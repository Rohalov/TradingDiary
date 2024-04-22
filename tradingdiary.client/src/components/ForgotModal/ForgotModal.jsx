import { useState } from "react";
import './ForgotModal.css'
import service from '../../api/EmailService';
import { MdOutgoingMail } from "react-icons/md";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

function ForgotModal({ closeModal }) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [emailSent, setEmailSent] = useState(false);

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
                <MdOutgoingMail size={60} />
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
                        <CloseIcon height="24" width="24" />
                    </button>
                </div>

                {emailSent ? emailSentBox : emailForm}

            </div>
        </div>
    )

    async function send(e) {
        e.preventDefault();
        await service.sendForgotMessage(email, setEmailSent, setErrorMessage);
    }
}

export default ForgotModal
