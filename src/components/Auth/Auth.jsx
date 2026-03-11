import React, { useState } from 'react';
import './Auth.css';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // гость - вход
    const guest = () => {
        onLogin({ role: 'guest' });
    };

    // сотрудник - вход
    const employee = () => {
        if (!formData.email || !formData.password) {
            alert('Введите email и пароль');
            return;
        }
        onLogin({ ...formData, role: 'employee' });
    };

    return (
        <div className="role">
            <div className="buttonGroup">
                <button onClick={guest}>Гость</button>
                <button onClick={employee}>Сотрудник</button>
            </div>
        </div>
    );
};

export default LoginForm;