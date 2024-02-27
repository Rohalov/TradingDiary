import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

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
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <label htmlFor="userName">Username</label>
                    <input type="text" name="userName" value={userData.userName}
                        placeholder="Username" onChange={handleInputChange} required autoFocus/>
                </div>

                <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={userData.password}
                        placeholder="Password" onChange={handleInputChange} required />
                </div>

                <div className="forgot">
                    <a href="#">Forgot password?</a>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="submit-button">
                    <button type="submit">Login</button>
                </div>

                <div className="register-link">
                    <p>Don`t have an account?
                        <Link to='/register'>
                            <a href="#">Register</a>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const responce = await fetch('https://localhost:7049/api/Authentication/login', {
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
