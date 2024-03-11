import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    return (
        <div className="home-container">
            <div className='header'>
                <h1>Trading Diary</h1>
            </div>

            <div className='button-container'>
                <Link to='/login'>
                    <button className='login-btn'>Login</button>
                </Link>
                <Link to='/register'>
                    <button className='register-btn'>Register</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
