
export const service = {

    async login(userData, navigate, setErrorMessage) {

        const responce = await fetch('/api/Authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await responce.text();
        console.log(data);

        if (responce.status == 200) {
            localStorage.setItem("token", data)
            navigate("/trades");
        } else {
            setErrorMessage(data);
        }
    },

    async register(userData, navigate, setErrorMessage) {
        const responce = await fetch('/api/Authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await responce.json();
        console.log(data);

        if (responce.status == 201) {
            navigate("/login");
        } else {
            setErrorMessage(data.errors[0].description);
        }
    }
};

export default service