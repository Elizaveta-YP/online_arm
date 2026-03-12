import React, { useState } from 'react';
import './EmployeeDashboard.css';
import Navigation from '../Navigation/Navigation';
import ControlPanel from '../ControlPanel/ControlPanel';
import Header from '../Header/Header';
import MyTasks from '../PopUp/MyTasks/MyTasks'; 

const EmployeeDashboard = ({ onLogout }) => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [pinError, setPinError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('controlPanel'); 

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) return false;
    if (digits.length === 11) {
      return digits[0] === '7' || digits[0] === '8';
    }
    return true;
  };

  const handlePhoneBlur = () => {
    if (phone.trim() === '') {
      setPhoneError('');
      return;
    }
    setPhoneError(validatePhone(phone) ? '' : 'Некорректный номер телефона');
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
    setPinError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError('Некорректный номер телефона');
      return;
    } else {
      setPhoneError('');
    }

    if (pin !== '1') {
      setPinError('Неверный пин, попробуйте еще раз');
      return;
    } else {
      setPinError('');
    }

    setIsAuthenticated(true);
  };

  const handleMyTasksClick = () => {
    setCurrentView('myTasks');
  };

  const handleBackToControlPanel = () => {
    setCurrentView('controlPanel');
  };

if (isAuthenticated) {
  return (
    <>
      {currentView === 'controlPanel' && (
        <ControlPanel
          onLogout={onLogout}
          userPhone={phone}
          onMyTasksClick={handleMyTasksClick}
        />
      )}
      {currentView === 'myTasks' && (
        <>
          <button onClick={handleBackToControlPanel} className="backButton">
            ← Назад
          </button>
          <MyTasks />
        </>
      )}
    </>
  );
}

  return (
    <>
      <Header />
      <Navigation onBack={onLogout} onForward={() => {}} />
      <div className="employeeDashboard">
        <h2 className="subtitle">Сотрудник</h2>
        <form className="employeeForm" onSubmit={handleSubmit}>
          <div className="formGroups">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="Номер телефона"
              required
              className="accentBorders"
            />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>
          <div className="formGroups">
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="Пин-код"
              maxLength={4}
              required
              className="accentBorders"
            />
            {pinError && <span className="error">{pinError}</span>}
          </div>

          <div className="formActions">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeDashboard;