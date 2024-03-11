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
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" name="userName" value={userData.userName}
                        placeholder="Username" onChange={handleInputChange} required/>
                </div>

                <div className="input-box">
                    <input type="email" name="email" value={userData.email}
                        placeholder="Email" onChange={handleInputChange} required/>
                </div>

                <div className="input-box">
                    <input type="password" name="password" value={userData.password}
                        placeholder="Password" onChange={handleInputChange} required/>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="submit-button">
                    <button type="submit">Register</button>
                </div>

                <div className="register-link">
                    <p>If you have an account, you can sing up.
                        <Link to='/login'>
                            <a href="#">Login</a>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )

    async function handleSubmit(e) {
        e.preventDefault();

        const responce = await fetch('https://localhost:7049/api/Authentication/register', {
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
