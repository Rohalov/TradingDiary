import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForgotModal from '../../components/ForgotModal/ForgotModal';
import service from '../../api/AuthService';
import './Login.css'

function Login() {
    const [userData, setUserData] = useState({
        userName: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState();
    const [forgotModalIsOpen, setForgotModalIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const openModal = (e) => {
        e.preventDefault();
        setForgotModalIsOpen(true);
    };

    return (
        <div className="login-container">
            <div className="login-modal">
                <form onSubmit={handleSubmit}>
                    <h1>Вхід</h1>
                    <div className="input-box">
                        <input type="text" name="userName" value={userData.userName}
                            placeholder="Ім'я користувача" onChange={handleInputChange} required autoFocus />
                    </div>

                    <div className="input-box">
                        <input type="password" name="password" value={userData.password}
                            placeholder="Пароль" onChange={handleInputChange} required />
                    </div>

                    <div className="forgot">
                        <a href="#" onClick={openModal}>Забули пароль?</a>
                        {forgotModalIsOpen && <ForgotModal closeModal={() => setForgotModalIsOpen(false)} />}
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="submit-button">
                        <button type="submit">Увійти</button>
                    </div>


                    <div className="register-link">
                        Немає облікового запису?
                        <Link to='/register'>
                            <a>Зареєструватися</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        await service.login(userData, navigate, setErrorMessage);
    }
}

export default Login
