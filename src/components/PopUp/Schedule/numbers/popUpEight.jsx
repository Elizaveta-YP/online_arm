import React, { useState } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import choiceAfter from "../../../../image/choiceAfter.png";
import "./popUpEight.css";

const PopUpEight = ({ onBack }) => {
  const buttonsText = [
    "Глухих Дмитрий Васильевич", "Минин Денис Игоревич", "Ткаченко Сергей Александрович", "Кощеев Виктор Сергеевич", "Мотошков Илья Александрович"
  ];
  {/*для второй формы*/}
  const buttonsTexts = [
    "Зиновьев Вадим Алексеевич", "Базаев Василий Алексеевич", "Шестакова Антонина Валентиновна"
  ];

  {/*для третьей формы*/}
  const buttonText = [
    "Списание"
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
    <div className="popup-eight">
      <h2 className="popup-eight-title">Выберите ответственного</h2>
      <div className="buttonGrid">
        {buttonsText.map((text, index) => (
          <button
            key={index}
            className={`controlButton buttonEight ${selectedIndex === index ? 'selected' : ''}`}
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
      <div className="popup-eight-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
      {/* вторая форма*/}
       <h2 className="popup-eight-title">Выберите ответственного</h2>
      <div className="buttonGrid">
        {buttonsTexts.map((text, index) => (
          <button
            key={index}
            className={`controlButton buttonEight controlButtonColorOne ${selectedIndex === index ? 'selected' : ''}`}
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
      <div className="popup-eight-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
       {/* третья форма*/}
       <h2 className="popup-eight-title">Выберите ответственного</h2>
      <div className="buttonGrid">
        {buttonText.map((text, index) => (
          <button
            key={index}
            className={`controlButton buttonEight controlButtonColorTwo ${selectedIndex === index ? 'selected' : ''}`}
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
      <div className="popup-eight-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpEight;