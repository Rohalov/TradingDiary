import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css'

function Login() {
    const [userData, setUserData] = useState({
        userName: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState();

    const [, setToken] = useContext(AuthContext);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="login-container">
            <div className="login-modal">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" name="userName" value={userData.userName}
                            placeholder="Ім'я користувача" onChange={handleInputChange} required autoFocus />
                    </div>

                    <div className="input-box">
                        <input type="password" name="password" value={userData.password}
                            placeholder="Пароль" onChange={handleInputChange} required />
                    </div>

                    <div className="forgot">
                        <a href="#">Забули пароль?</a>
                    </div>
                    
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="submit-button">
                        <button type="submit">Увійти</button>
                    </div>


                    <div className="register-link">
                        Немає облікового запису?
                        <Link to='/register'>
                            <a href="#">Зареєструватися</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const responce = await fetch('/api/Authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await responce.text();
            console.log(data);
            if (responce.status == 200) {
                setToken(data);
                navigate("/trades");
            } else {
                setErrorMessage("Invalid username or password");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Login
