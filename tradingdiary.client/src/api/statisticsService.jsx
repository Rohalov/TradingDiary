import { token } from '../contexts/AuthContext';

export const service = {

    async getCustomStat(from, to){
        return await get(`custom?from=${from}&to=${to}`)
    },

    async getStatisticForWeek() {
        return await get("for-week");
    },

    async getStatisticForMonth() {
        return await get("for-month");
    },

    async getAllTimeStat() {
        return await get('all-time');
    }
};

async function get(url) {
    const responce = await fetch(`/api/Statistics/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await responce.json();
    console.log(data);
    return (data);
}
