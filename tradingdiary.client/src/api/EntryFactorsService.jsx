import { token } from '../contexts/AuthContext';

export const service = {

    async getEntryFactors() {
        const responce = await fetch('/api/EntryFactors', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
        return data;
    },

    async addFactor(newFactor) {
        const responce = await fetch('/api/EntryFactors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newFactor)
        });

        const data = await responce.json();
        console.log(data);
    },

    async deleteFactor(id) {
        const responce = await fetch(`/api/EntryFactors/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await responce.json();
        console.log(data);
    },

    async updateFactor(id, name) {
        const responce = await fetch(`/api/EntryFactors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(name)
        });

        const data = await responce.json();
        console.log(data);
    }
};

export default service