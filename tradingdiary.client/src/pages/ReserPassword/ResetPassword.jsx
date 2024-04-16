import { useState } from "react";
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
                        <h5 className="panel-title">Введіть новий пароль</h5>
                        <input className="panel-input" type="text" onChange={handleInputChange} />

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button className="panel-button" onClick={resetPassword}>Змінити</button>
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

    async function resetPassword() {
        const responce = await fetch(`/api/Users/reset-password/${resetToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPassword)
        });
        const data = await responce.json();
        if (!responce.ok) {
            setErrorMessage(data.errors[0].description);
        }
    }
}

export default ResetPassword