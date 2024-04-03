import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {

    const signOut = () => {
        localStorage.removeItem("token");
    }

    return (
        <nav className="navbar">
            <ul className='nav-menu'>
                <li>
                    <Link to='/trades'>
                        <a className="nav-link">Журнал</a>
                    </Link>
                </li>
                <li>
                    <Link to='/statistics'>
                        <a className="nav-link">Статистика</a>
                    </Link>
                </li>
                <li>
                    <Link >
                        <a className="nav-link">Налаштування</a>
                    </Link>
                </li>
            </ul>

            <div className='sign-out'>
                <Link to='/'>
                    <button onClick={signOut} className='nav-btn'>Вийти</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar