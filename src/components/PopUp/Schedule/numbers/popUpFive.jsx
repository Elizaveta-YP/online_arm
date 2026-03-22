import React, { useState } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import choiceAfter from "../../../../image/choiceAfter.png";
import "./popUpFive.css";

const PopUpFive = ({ onBack }) => {
  const recipients = [
    'Глухих Дмитрий Васильевич',
    'Минин Денис Игоревич',
    'Ткаченко Сергей Александрович',
    'Кошеев Виктор Сергеевич',
    'Мотошков Илья Александрович',
    'Зиновьев Вадим Алексеевич',
    'Базаев Василий Алексеевич',
    'Зазуля Екатерина Алексеевна',
    'Шестакова Антонина Валентиновна'
  ];

  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const handleRecipientSelect = (index) => {
    setSelectedRecipient(selectedRecipient === index ? null : index);
  };

  const handleSave = () => {
    if (selectedRecipient === null) {
      alert('Пожалуйста, выберите получателя комментария');
      return;
    }
    console.log('Выбран получатель:', recipients[selectedRecipient]);
    onBack();
  };

  return (
    <div className="popup-five">
      <h2 className="popup-five-title">Выберите кому адресуется комментарий</h2>
      <div className="taskButtons">
        {recipients.map((name, idx) => (
          <button
            key={idx}
            className={`taskButton ${idx < 5 ? 'engineersButtons' : ''}`}
            onClick={() => handleRecipientSelect(idx)}
          >
            <img
              src={selectedRecipient === idx ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {name}
          </button>
        ))}
      </div>
      <div className="popup-five-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpFive;