import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import './Settings.css';

function Settings() {
    const [userData, setUserData] = useState({
        userName: '',
        email: ''
    });
    const [token, checkAuth] = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div className="settings-container">
            <div className="header">
                <Navbar />
            </div>

            <div className="main-content">
                <div className="sidebar">
                    <aside>
                        <Link to="/settings">
                            <a className="sidebar-item active">Профіль</a>
                        </Link>
                    </aside>
                </div>
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
                                <input type="text" placeholder="Введи ім'я аккаунту" value={userData.userName} />
                            </div>
                        </div>
                        <div className="settings-item">
                            <div className="item-label">
                                Email
                            </div>
                            <div className="item-input" >
                                <input type="text" placeholder="Email" value={userData.email} />
                            </div>
                        </div>
                        <button className="save-button">Зберегти</button>
                        <div className="settings-item">
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
}

export default Settings
