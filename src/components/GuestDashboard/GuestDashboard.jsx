import React, { useState } from "react";
import "./GuestDashboard.css";
import Navigation from "../Navigation/Navigation";
import SparePartForm from "../SparePartForm/SparePartForm";
import RepairRequestForm from "../RepairRequestForm/RepairRequestForm";
import Agreement from "../Agreement/Agreement";
import GuestEntrance from "../GuestEntrance/GuestEntrance";
import GuestRegistration from "../GuestRegistration/GuestRegistration";
import ScheduleApproval from "../ScheduleApproval/ScheduleApproval";
import Header from "../Header/Header";

const SCREENS = {
  MENU: "menu",
  PART_FORM: "partForm",
  REPAIR_FORM: "repairForm",
  AGREEMENT: "agreement",
  GUEST_ENTRANCE: "guestEntrance",
  GUEST_REGISTRATION: "guestRegistration",
  SCHEDULE_APPROVAL: "scheduleApproval",
};

const GuestDashboard = ({ onLogout }) => {
  const [history, setHistory] = useState([{ type: SCREENS.MENU }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userInnKpp, setUserInnKpp] = useState("");

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
  const handleAgreement = () => navigateTo(SCREENS.AGREEMENT);
  const handleGuestEntrance = () => navigateTo(SCREENS.GUEST_ENTRANCE);
  const handleGuestRegistration = () => navigateTo(SCREENS.GUEST_REGISTRATION);

  const handleScheduleApproval = (innKpp, phone) => {
    setUserInnKpp(innKpp);
    setUserPhone(phone);
    navigateTo(SCREENS.SCHEDULE_APPROVAL);
  };

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
      case SCREENS.AGREEMENT:
        return (
          <Agreement
            onClose={handleCloseForm}
            onLogin={handleGuestEntrance}
            onRegister={handleGuestRegistration}
          />
        );
      case SCREENS.GUEST_ENTRANCE:
        return (
          <GuestEntrance
            onClose={handleCloseForm}
            onSuccess={handleScheduleApproval}
          />
        );
      case SCREENS.GUEST_REGISTRATION:
        return <GuestRegistration onClose={handleCloseForm} />;
      case SCREENS.SCHEDULE_APPROVAL:
        return (
          <ScheduleApproval
            onClose={handleCloseForm}
            phone={userPhone}
            innKpp={userInnKpp}
            onSparePart={handlePartRequest}
            onRepair={handleRepairRequest}
          />
        );
      default:
        return (
          <>
            <h2 className="subtitle">Гость</h2>
            <div className="guestButtons">
              <button onClick={handlePartRequest}>
                Подать заявку на запчасть
              </button>
              <button onClick={handleRepairRequest}>
                Подать заявку на ремонт оборудования
              </button>
              <button onClick={handleAgreement}>Согласование</button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {history[currentIndex].type !== SCREENS.SCHEDULE_APPROVAL && <Header />}

      {history[currentIndex].type !== SCREENS.SCHEDULE_APPROVAL && (
        <div>
          <Navigation onBack={goBack} onForward={goForward} />
        </div>
      )}
      <div className="guestDashboard">{renderScreen()}</div>
    </>
  );
};

export default GuestDashboard;
