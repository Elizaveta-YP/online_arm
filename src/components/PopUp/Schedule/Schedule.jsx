import React, { useState, useEffect } from "react";
import "./Schedule.css";
import popUpOne from "./numbers/popUpOne";
import popUpTwo from "./numbers/popUpTwo";
import popUpThree from "./numbers/popUpThree";
import popUpFour from "./numbers/popUpFour";
import popUpFive from "./numbers/popUpFive";
import popUpSix from "./numbers/popUpSix";
import popUpSeven from "./numbers/popUpSeven";
import popUpEight from "./numbers/popUpEight";
import popUpNine from "./numbers/popUpNine";

// Простой попап для кнопок 2–10
const PopupSimple = ({ title, content, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  </div>
);

const Schedule = () => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (id) => setActivePopup(id);
  const closePopup = () => setActivePopup(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && activePopup !== null) closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activePopup]);

  const renderPopup = () => {
    switch (activePopup) {
      case 1:
        // Для первой кнопки – ваш компонент popUpOne
        return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-one-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpOne, { onBack: closePopup })}
            </div>
          </div>
        );
         case 2:
        // Для второй кнопки – компонент popUpTwo
        return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpTwo, { onBack: closePopup })}
            </div>
          </div>
        );
      case 3:
          return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpThree, { onBack: closePopup })}
            </div>
          </div>
        );
      case 4:
         return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpFour, { onBack: closePopup })}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpFive, { onBack: closePopup })}
            </div>
          </div>
        );
      case 6:
         return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpSix, { onBack: closePopup })}
            </div>
          </div>
        );
      case 7:
         return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpSeven, { onBack: closePopup })}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpEight, { onBack: closePopup })}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePopup}>
                &times;
              </button>
              {React.createElement(popUpNine, { onBack: closePopup })}
            </div>
          </div>
        );
      case 10:
        return <PopupSimple title="Попап 10" content="Содержимое десятого попапа." onClose={closePopup} />;
      default:
        return null;
    }
  };

  return (
    <div className="schedule-container">
      <h2>Расписание (Schedule)</h2>
      <div className="buttons-grid">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
          <button key={id} className="schedule-button" onClick={() => openPopup(id)}>
            Кнопка {id}
          </button>
        ))}
      </div>
      {activePopup !== null && renderPopup()}
    </div>
  );
};

export default Schedule;