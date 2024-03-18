import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className='navbar-home'>
                <div className=''>
                </div>

                <div className='action-module'>
                    <Link to='/login'>
                        <button className='action-module-login-btn'>Увійти</button>
                    </Link>
                    <Link to='/register'>
                        <button>Зареєструватися</button>
                    </Link>
                </div>
            </div>

            <div className='main'>
                <div className="main-grid">
                    <div className="page-content">
                        <h1 className='headline'>Щоденник трейдера</h1>
                        <div className='button-container'>
                            <Link to='/login'>
                                <button>Увійти</button>
                            </Link>
                            <Link to='/register'>
                                <button>Зареєструватися</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
