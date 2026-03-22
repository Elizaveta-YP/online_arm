import React, { useState } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import choiceAfter from "../../../../image/choiceAfter.png";
import "./popUpSeven.css";

const PopUpSeven = ({ onBack }) => {
  const buttonsText = [
    "На сервисном складе (не требует согласования)",
    "На сервисном складе (требует согласования)",
    "На сервисном складе (по гарантии)",
    "На сервисном складе (не требует согласования)",
    "Нет на сервисном складе (требует согласования)",
    "Нет на сервисном складе (по гарантии)",
    "Ремонт без использования запчастей (требует согласования)", 
    "Ремонт без использования запчастей (не требует согласования)", 
    "Выдача запчастей для диагностики, на сервисном складе", 
    "Выдача запчастей для диагностики, нет на сервисном складе",
    "Входной контроль"
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleSave = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsText[selectedIndex]);
    onBack();
  };

  return (
    <div className="popup-seven">
      <h2 className="popup-seven-title">Выберите слово</h2>
      <div className="buttonGrid">
        {buttonsText.map((text, index) => (
          <button
            key={index}
            className={`controlButton controlButtonOne ${index < 5 ? 'engineersButtons' : ''}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {text}
          </button>
        ))}
      </div>
      <div className="popup-seven-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
      {/*вторая форма*/}
      <h2 className="popup-seven-title">Выберите слово</h2>
      <div className="buttonGrid">
        {buttonsText.map((text, index) => (
          <button
            key={index}
           className={`controlButton controlButtonOne ${index === buttonsText.length - 1 ? 'last-button' : ''}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {text}
          </button>
        ))}
      </div>
      <div className="popup-seven-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpSeven;