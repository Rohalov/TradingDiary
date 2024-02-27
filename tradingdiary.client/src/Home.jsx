import { Link } from 'react-router-dom';

function Home() {

    return (
        <div>
            <div className='header'>
                <h1>Trading Diary</h1>
            </div>

            <div className='button-container'>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/register'>
                    <button>Register</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
