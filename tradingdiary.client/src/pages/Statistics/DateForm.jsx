import { useState } from 'react';
import { service } from '../../api/statisticsService';
import './DateForm.css';

function DateForm({ closeDateForm, setData }) {
    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="date-container">
            <form>
                <div className="input-date-block">
                    <label htmlFor="from">Від:</label>
                    <input type="date" name="from" onChange={handleInputChange} required></input>
                </div>

                <div className="input-date-block">
                    <label htmlFor="to">До:</label>
                    <input type="date" name="to" onChange={handleInputChange} required></input>
                </div>

                <div className="submit-btn">
                    <button type="submit" onClick={handleSubmit}>Підтвердити</button>
                </div>
            </form>
        </div>
    )

    async function handleSubmit() {
        const data = await service.getCustomStat(formData.from, formData.to);
        setData(data);
        closeDateForm();
    }
}

export default DateForm