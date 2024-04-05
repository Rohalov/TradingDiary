import { useEffect, useContext, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import './Settings.css';
import Sidebar from './Sidebar';

function Settings() {
    const [userData, setUserData] = useState({
        userName: '',
        email: ''
    });
    const [token, checkAuth] = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
        getUserData();
    }, []);

    const handleNameChange = (e) => {
        const name = e.target.value;
        setUserData({ userName: name });
    }

    return (
        <div className="settings-container">
            <div className="header">
                <Navbar />
            </div>

            <div className="main-content">
                <Sidebar />
                
                <div className="box">
                    <div className="box-header">
                        Профіль
                    </div>
                    <div className="profile-settings-form">
                        <div className="settings-item">
                            <div className="item-label">
                                Ім'я користувача
                            </div>
                            <div className="item-input" >
                                <input type="text" placeholder="Введи ім'я аккаунту" value={userData.userName} onChange={handleNameChange} />
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-label">
                                Email
                            </div>
                            <div className="item-input">
                                <input className='disabled-input' type="text" placeholder="Email" value={userData.email} disabled/>
                            </div>
                        </div>

                        <button className="save-button" onClick={saveUserData}>Зберегти</button>
                        
                        <div className="settings-item" id='password-setting'>
                            <div className="item-label">
                                Пароль
                            </div>
                            <button>Змінити</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    async function getUserData() {
        const responce = await fetch('/api/Users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
        setUserData(data);
    }

    async function saveUserData(){
        const responce = await fetch('/api/Users/rename', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData.userName)
        })
            .catch(error => console.error('Error:', error));

        const data = await responce.json();
        console.log(data);
    }
}

export default Settings
