import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [userData, setUserData] = useState({
        userName: "",
        eMail: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={userData.userName}
                        placeholder="Username" onChange={handleInputChange} />
                </div>

                <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userData.email}
                        placeholder="Email" onChange={handleInputChange} />
                </div>

                <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={userData.password}
                        placeholder="Password" onChange={handleInputChange} />
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
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

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
