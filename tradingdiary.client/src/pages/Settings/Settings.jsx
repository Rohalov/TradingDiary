import { useEffect, useContext, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import './Settings.css';
import Sidebar from './Sidebar';
import service from '../../api/UserService';

function Settings() {
    const [userData, setUserData] = useState({
        userName: '',
        email: ''
    });
    const [checkAuth] = useContext(AuthContext);

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

            <div className="main-block">
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
                                <input className='disabled-input' type="text" placeholder="Email" value={userData.email} disabled />
                            </div>
                        </div>

                        <button className="save-button" onClick={() => { service.saveUserData(userData.userName) }}>Зберегти</button>

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
        const data = await service.getUserData();
        setUserData(data);
    }
}

export default Settings
