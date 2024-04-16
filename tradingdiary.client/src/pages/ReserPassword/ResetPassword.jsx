import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import './ResetPassword.css'


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
                            <input className="panel-input" type="text" value={newPassword} placeholder="Новий пароль" onChange={handleInputChange} />
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>


                        <div className="panel-block">
                            <button className="panel-button" onClick={resetPassword}><FaArrowRight className="arrow-icon" /></button>
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

    async function resetPassword(e) {
        e.preventDefault();
        const responce = await fetch(`/api/Users/reset-password/${resetToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPassword)
        });
        const data = await responce.json();
        if (responce.status != 200) {
            setErrorMessage(data.errors[0].description);
        }
    }
}

export default ResetPassword