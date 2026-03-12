import React, { useState } from 'react';
import './components/variables.css';
import Auth from './components/Auth/Auth';
import GuestDashboard from './components/GuestDashboard/GuestDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('Вошёл - ', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {user?.role === 'guest' ? (
          <GuestDashboard onLogout={handleLogout} />
        ) : user?.role === 'employee' ? (
          <EmployeeDashboard onLogout={handleLogout} />
        ) : (
          <Auth onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;