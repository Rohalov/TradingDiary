import { Link } from 'react-router-dom';
import './Sidebar.css'

function Sidebar({ active }) {
    return (
        <div className="sidebar">
            <aside>
                <Link to="/settings">
                    <div className={`sidebar-item ${active === 'profile' ? "active" : ""}`}>Профіль</div>
                </Link>
                <Link to="/settings/factors">
                    <div className={`sidebar-item ${active === 'factors' ? "active" : ""}`}>Фактори</div>
                </Link>
            </aside>
        </div>
    )
}

export default Sidebar