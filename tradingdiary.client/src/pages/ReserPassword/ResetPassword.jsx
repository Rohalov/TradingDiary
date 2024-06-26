import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import './ResetPassword.css'
import service from "../../api/UserService";


function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState();

    const resetToken = getToken();

    const handleInputChange = (e) => {
        const pass = e.target.value;
        setNewPassword(pass)
    }

    return (
        <div className="main-container">
            <div className="web-content">
                <h3 className="web-title">Зміна паролю</h3>
                <form>
                    <div className="panel">
                        <div className="panel-block">
                            <h5 className="panel-title">Введіть новий пароль</h5>
                            <h5 className="panel-subtitle">Переконайcя в надійності</h5>
                        </div>

                        <div className="panel-block">
                            <input className="panel-input" type="text" value={newPassword} placeholder="Новий пароль" onChange={handleInputChange} required/>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>


                        <div className="panel-block">
                            <button className="panel-button" onClick={handleSubmit}><FaArrowRight className="arrow-icon" /></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    function getToken() {
        const url = window.location.href;
        const parts = url.split('/');
        const token = parts[parts.length - 1];
        return token;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await service.resetPassword(resetToken, newPassword, setErrorMessage)
    }
}

export default ResetPassword