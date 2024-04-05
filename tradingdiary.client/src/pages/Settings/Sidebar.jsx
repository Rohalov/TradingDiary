import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar">
            <aside>
                <Link to="/settings">
                    <a className="sidebar-item active">Профіль</a>
                </Link>
            </aside>
        </div>
    )
}

export default Sidebar