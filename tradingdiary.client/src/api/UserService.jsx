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
    },

    async resetPassword(resetToken, newPassword, setErrorMessage) {
        const responce = await fetch(`/api/Users/reset-password/${resetToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPassword)
        });
        const data = await responce.json();
        if (responce.status != 200) {
            setErrorMessage(data.errors[0].description);
        }
    }
}

export default service;