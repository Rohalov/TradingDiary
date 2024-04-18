import { token } from '../contexts/AuthContext';

export const service = {

    async getUserData() {
        const responce = await fetch('/api/Users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
        return data;
    },

    async saveUserData(name) {
        const responce = await fetch('/api/Users/rename', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        const data = await responce.json();
        console.log(data);
        return data;
    }
}

export default service;