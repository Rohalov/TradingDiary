import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

function Register() {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="register-container">
            <div className='register-modal'>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" name="userName" value={userData.userName}
                            placeholder="Ім'я користувача" onChange={handleInputChange} required />
                    </div>

                    <div className="input-box">
                        <input type="email" name="email" value={userData.email}
                            placeholder="Email" onChange={handleInputChange} required />
                    </div>

                    <div className="input-box">
                        <input type="password" name="password" value={userData.password}
                            placeholder="Пароль" onChange={handleInputChange} required />
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="submit-button">
                        <button type="submit">Зареєструватися</button>
                    </div>

                    <div className="login-link">
                        Вже маєш обліковий запис?
                        <Link to='/login'>
                            <a>Увійти</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();

        const responce = await fetch('/api/Authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (responce.status == 201) {
            navigate("/login");
        } else {
            setErrorMessage("User with that name already exist");
        }

        const data = await responce.json();
        console.log(data);
    }
}

export default Register
