import React, { useState } from 'react';
import './GuestDashboard.css';
import Navigation from '../Navigation/Navigation';
import SparePartForm from '../SparePartForm/SparePartForm';
import RepairRequestForm from '../RepairRequestForm/RepairRequestForm';

const SCREENS = {
  MENU: 'menu',
  PART_FORM: 'partForm',
  REPAIR_FORM: 'repairForm',
};

const GuestDashboard = ({ onLogout }) => {
  const [history, setHistory] = useState([{ type: SCREENS.MENU }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateTo = (screenType) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push({ type: screenType });
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex === 0 && history[currentIndex].type === SCREENS.MENU) {
      onLogout();
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePartRequest = () => navigateTo(SCREENS.PART_FORM);
  const handleRepairRequest = () => navigateTo(SCREENS.REPAIR_FORM);

  const handleCloseForm = () => {
    const currentScreen = history[currentIndex].type;
    if (currentScreen !== SCREENS.MENU) {
      navigateTo(SCREENS.MENU);
    }
  };

  const renderScreen = () => {
    const currentScreen = history[currentIndex].type;
    switch (currentScreen) {
      case SCREENS.PART_FORM:
        return <SparePartForm onClose={handleCloseForm} />;
      case SCREENS.REPAIR_FORM:
        return <RepairRequestForm onClose={handleCloseForm} />;
      default:
        return (
          <>
            <h2>Гость</h2>
            <div className="guestButtons">
              <button onClick={handlePartRequest}>Подать заявку на запчасть</button>
              <button onClick={handleRepairRequest}>Подать заявку на ремонт оборудования</button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div>
        <Navigation onBack={goBack} onForward={goForward} />
      </div>
      <div className="guestDashboard">
        {renderScreen()}
      </div>
    </>
  );
};

export default GuestDashboard;