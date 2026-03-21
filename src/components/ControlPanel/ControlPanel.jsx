import React, { useState } from "react";
import "./ControlPanel.css";
import HeaderEmployee from "../Header/HeaderEmployee";
import Navigation from "../Navigation/Navigation";
import MyTasks from "../PopUp/MyTasks/MyTasks";
import TaskAssignment from "../PopUp/TaskAssignment/TaskAssignment";
import SparePartRequest from "../PopUp/SparePartRequest/SparePartRequest";
import DepartureRequest from "../PopUp/DepartureRequest/DepartureRequest";
import EquipmentCollection from "../PopUp/EquipmentCollection/EquipmentCollection";
import PaidDeparturesReport from "../PopUp/PaidDeparturesReport/PaidDeparturesReport";
import Schedule from '../PopUp/Schedule/Schedule';
// import Archive from '../PopUp/Archive/Archive'; ДОБАВИМ НЕМНОГО ПОЗЖЕ

const ControlPanel = ({ onLogout, userPhone, userInnKpp }) => {
  const [currentPage, setCurrentPage] = useState("main");

  const navigateTo = (page) => setCurrentPage(page);
  const goBack = () => setCurrentPage("main");

  const buttons = [
    { text: "Мои задачи", page: "myTasks" },
    { text: "Поставить задачи", page: "taskAssignment" },
    { text: "Подать заявку на запчасть", page: "sparePart" },
    { text: "Подать заявку на выезд", page: "departure" },
    { text: "Забор оборудования в ремонт", page: "equipment" },
    { text: "Отчет по платным выездам", page: "paidReport" },
    { text: "График", page: "schedule", color: "button2" },
    { text: "Архив", page: "archive", color: "button2" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "myTasks":
        return <MyTasks onBack={goBack} />;
      case "taskAssignment":
        return <TaskAssignment onBack={goBack} />;
      case "sparePart":
        return <SparePartRequest onBack={goBack} />;
      case "departure":
        return <DepartureRequest onBack={goBack} />;
      case "equipment":
        return <EquipmentCollection onBack={goBack} />;
      case "paidReport":
        return <PaidDeparturesReport onBack={goBack} />;
      case 'schedule':
        return <Schedule onBack={goBack} />;
      // case 'archive':
      //   return <Archive onBack={goBack} />;  ДОБАВИМ НЕМНОГО ПОЗЖЕ
      default:
        return (
          <div className="buttonGrid">
            {buttons.map((item) => (
              <button
                key={item.page}
                className={`controlButton ${item.color ? `controlButton--${item.color}` : ""}`}
                onClick={() => navigateTo(item.page)}
              >
                {item.text}
              </button>
            ))}
          </div>
        );
    }
  };
  return (
    <div className="controlPanel">
      <HeaderEmployee userPhone={userPhone} onLogout={onLogout} />
      <Navigation onBack={onLogout} onForward={() => {}} />
      {renderPage()}
    </div>
  );
};

export default ControlPanel;
