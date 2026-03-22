import React, { useState } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import choiceAfter from "../../../../image/choiceAfter.png";
import goOver from "../../../../image/goOver.png";
import ScheduleApproval from "../../../ScheduleApproval/ScheduleApproval";
import "./popUpNine.css";

const PopUpNine = ({ onBack }) => {
  const buttonsOne = [
    { text: "Обработано", className: "button-one" },
    {
      text: "Выдача без документов для диагностики",
      className: "controlButtonOne last-button",
    },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsTwo = [
    {
      text: "Требуется закупочная стоимость, требуется наличие на складе",
      className: "button-one",
    },
    {
      text: "Не требуется закупочная стоимость, требуется наличие на складе",
      className: "button-one",
    },
    {
      text: "Требуется закупочная стоимость, не требуется наличие на складе",
      className: "button-one",
    },
    {
      text: "Не требуется закупочная стоимость, не требуется наличие на складе",
      className: "button-one",
    },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsThree = [
    { text: "На складе", className: "button-one" },
    { text: "Требуется заказать", className: "button-one" },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsFour = [
    { text: "На складе", className: "button-one" }, // заменится на textarea
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsFive = [
    { text: "На складе", className: "button-one" },
    { text: "1-3 дня", className: "button-one" },
    { text: "7-10 дней", className: "button-one" },
    { text: "14 дней", className: "button-one" },
    { text: "30 дней", className: "button-one" },
    { text: "45 дней", className: "button-one" },
    { text: "60 дней", className: "button-one" },
    { text: "90 дней", className: "button-one" },
    { text: "На складе", className: "button-one" }, // заменится на textarea
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsSix = [
    { text: "Согласовано", className: "button-one" },
    { text: "Не согласовано", className: "button-one" },
    { text: "Согласовано на торги", className: "button-one" },
    { text: "Отправить на согласование", className: "button-one" },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsSeven = [
    { text: "На складе", className: "button-one" },
    { text: "В пути", className: "button-one" },
    { text: "В пути с комментарием", className: "button-one" },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsEight = [
    { text: "Запчасть выписана", className: "button-one" },
    { text: "Выдана без документов", className: "button-one" },
    { text: "Выдана без документов для диагностики", className: "button-one" },
    { text: "Вернуть на прошлый этап", className: "accentBordersColor" },
  ];

  const buttonsNine = [];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");

  const [showApproval, setShowApproval] = useState(false);
  const openApproval = () => setShowApproval(true);
  const closeApproval = () => setShowApproval(false);

  const handleSelect = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  {
    /* 1 */
  }
  const handleSaveOne = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsOne[selectedIndex].text);
    onBack();
  };
  {
    /* 2 */
  }
  const handleSaveTwo = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsTwo[selectedIndex].text);
    onBack();
  };

  {
    /* 3 */
  }
  const handleSaveThree = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsThree[selectedIndex].text);
    onBack();
  };

  {
    /* 4 */
  }
  const handleSaveFour = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsFour[selectedIndex].text);
    onBack();
  };

  {
    /* 5 */
  }
  const handleSaveFive = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsFour[selectedIndex].text);
    onBack();
  };

  /* 6 */
  const handleSaveSix = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsSix[selectedIndex].text);
    onBack();
  };

  /* 7 */

  const handleSaveSeven = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsThree[selectedIndex].text);
    onBack();
  };

  /* 8 */
  const handleSaveEight = () => {
    if (selectedIndex === null) {
      alert("Пожалуйста, выберите один из вариантов");
      return;
    }
    console.log("Выбрано:", buttonsThree[selectedIndex].text);
    onBack();
  };

  if (showApproval) {
    return (
      <div className="modal-overlay" onClick={closeApproval}>
        <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeApproval}>
            &times;
          </button>
          <ScheduleApproval onBack={closeApproval} />
        </div>
      </div>
    );
  }

  return (
    <div className="popup-nine">
      {/* первая форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsOne.map((button, index) => (
          <button
            key={index}
            className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {button.text}
          </button>
        ))}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveOne}
          className="action-icon"
        />
      </div>
      {/* вторая форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsTwo.map((button, index) => (
          <button
            key={index}
            className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {button.text}
          </button>
        ))}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveTwo}
          className="action-icon"
        />
      </div>
      {/* третья форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsThree.map((button, index) => (
          <button
            key={index}
            className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {button.text}
          </button>
        ))}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveThree}
          className="action-icon"
        />
      </div>
      {/* четвертая форма */}
      <h2 className="popup-nine-title">Введите стоимость</h2>
      <div className="buttonGrid">
        {buttonsFour.map((button, index) => {
          if (index === 0) {
            return (
              <div key={index} className="textarea-container">
                <textarea
                  className={`accentBorders ${selectedIndex === index ? "selected" : ""}`}
                  rows="2"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  onClick={() => handleSelect(index)}
                  placeholder="Название организации"
                  style={{ resize: "none", overflow: "hidden" }}
                />
              </div>
            );
          }

          return (
            <button
              key={index}
              className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
              onClick={() => handleSelect(index)}
            >
              <img
                src={selectedIndex === index ? choiceAfter : choice}
                alt="Выбрать"
                className="buttonIcon"
              />
              {button.text}
            </button>
          );
        })}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveFour}
          className="action-icon"
        />
      </div>
      {/* пятая форма */}
      <h2 className="popup-nine-title">Выберите из списка</h2>
      <div className="buttonGrid">
        <div className="two-columns-grid">
          {buttonsFive.slice(0, 8).map((button, idx) => (
            <button
              key={idx}
              className={`controlButton ${button.className} ${selectedIndex === idx ? "selected" : ""}`}
              onClick={() => handleSelect(idx)}
            >
              <img
                src={selectedIndex === idx ? choiceAfter : choice}
                alt="Выбрать"
                className="buttonIcon"
              />
              {button.text}
            </button>
          ))}
        </div>

        <div className="textarea-container">
          <textarea
            className={`accentBorders ${selectedIndex === 8 ? "selected" : ""}`}
            rows="2"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            onClick={() => handleSelect(8)}
            placeholder="Название организации"
            style={{ resize: "none", overflow: "hidden" }}
          />
        </div>

        <button
          className={`controlButton ${buttonsFive[9].className} ${selectedIndex === 9 ? "selected" : ""}`}
          onClick={() => handleSelect(9)}
        >
          <img
            src={selectedIndex === 9 ? choiceAfter : choice}
            alt="Выбрать"
            className="buttonIcon"
          />
          {buttonsFive[9].text}
        </button>
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveFive}
          className="action-icon"
        />
      </div>
      {/* шестая форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsSix.map((button, index) => {
          const isSendForApproval = button.text === "Отправить на согласование";

          const imgSrc =
            selectedIndex === index
              ? choiceAfter
              : isSendForApproval
                ? goOver
                : choice;
          return (
            <button
              key={index}
              className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""} ${isSendForApproval ? "right-icon-button" : ""}`}
              onClick={() => {
                if (isSendForApproval) {
                  openApproval();
                } else {
                  handleSelect(index);
                }
              }}
            >
              {isSendForApproval ? (
                <>
                  <span className="buttonText">{button.text}</span>
                  <img
                    src={imgSrc}
                    alt="Выбрать"
                    className="buttonIcon buttonIconRight"
                  />
                </>
              ) : (
                <>
                  <img src={imgSrc} alt="Выбрать" className="buttonIcon" />
                  <span className="buttonText">{button.text}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveSix}
          className="action-icon"
        />
      </div>

      {/* седьмая форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsSeven.map((button, index) => (
          <button
            key={index}
            className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {button.text}
          </button>
        ))}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveSeven}
          className="action-icon"
        />
      </div>
      {/* восьмая форма */}
      <h2 className="popup-nine-title">Выберите вариант</h2>
      <div className="buttonGrid">
        {buttonsEight.map((button, index) => (
          <button
            key={index}
            className={`controlButton ${button.className} ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <img
              src={selectedIndex === index ? choiceAfter : choice}
              alt="Выбрать"
              className="buttonIcon"
            />
            {button.text}
          </button>
        ))}
      </div>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveEight}
          className="action-icon"
        />
      </div>
      {/* девятая форма */}
      <h2 className="popup-nine-title">
        Вы действительно хотите удалить строку?
      </h2>
      <div className="popup-nine-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img
          src={yes}
          alt="Да"
          onClick={handleSaveThree}
          className="action-icon"
        />
      </div>
    </div>
  );
};

export default PopUpNine;
