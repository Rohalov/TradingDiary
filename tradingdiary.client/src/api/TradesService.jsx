import { token } from '../contexts/AuthContext';

export const service = {

    async deleteTrade(tradeId) {
        const responce = await fetch(`/api/Trades/${tradeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
    },

    async addTrade(trade) {
        const responce = await fetch('/api/Trades', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trade)
        });
        const data = await responce.json();
        console.log(data);
    },

    async updateTrade(tradeId, trade) {
        const responce = await fetch(`/api/Trades/${tradeId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trade)
        });
        const data = await responce.json();
        console.log(data);
    },

    async getTrades(page) {
        const responce = await fetch(`/api/Trades/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await responce.json();
        console.log(data);
        return data;
    }
};

export default service