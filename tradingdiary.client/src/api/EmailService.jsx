
export const service = {

    async sendForgotMessage(email, setEmailSent, setErrorMessage) {
        const responce = await fetch('/api/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        const data = await responce.text();
        if (responce.status == 200) {
            setEmailSent(true);
        } else {
            setErrorMessage(data);
        }
    }
}

export default service