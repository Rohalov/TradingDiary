import { token } from '../contexts/AuthContext';

export const service = {

    async getAllTradingPair() {
        const responce = await fetch('/api/TradingPairs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
        return data;
    }
}

export default service