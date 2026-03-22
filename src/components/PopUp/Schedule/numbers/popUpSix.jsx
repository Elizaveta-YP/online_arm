import React, { useState, useRef, useEffect } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import "./popUpSix.css";

const PopUpSix = ({ onBack }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSave = () => {
    if (!text.trim()) {
      alert("Пожалуйста, введите данные");
      return;
    }
    console.log("Введённые данные:", text);
    onBack();
  };

  return (
    <div className="popup-six">
      {/* первая форма */}
      <h2 className="popup-six-title">Введите необходимые данные</h2>
      <div className="field">
        <div className="textarea-container">
          <img src={choice} alt="Выбрать" className="textarea-icon" />
          <textarea
            maxLength={2000}
            className="accentBorders"
            rows="1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            placeholder="Введите данные..."
            style={{ resize: "none", overflow: "hidden" }}
          />
        </div>
      </div>

      {/* вторая форма */}
      <div className="popup-six-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
      <h2 className="popup-six-title">Введите необходимые данные</h2>
      <div className="field">
        <div className="textarea-container">
          <img src={choice} alt="Выбрать" className="textarea-icon" />
          <textarea
            maxLength={2000}
            className="accentBorders"
            rows="1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            placeholder="Введите данные..."
            style={{ resize: "none", overflow: "hidden" }}
          />
        </div>
        <div className="textarea-container">
          <img src={choice} alt="Выбрать" className="textarea-icon" />
          <textarea
            maxLength={2000}
            className="accentBorders accentBordersColor"
            rows="1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            placeholder="Вернуть на прошлый этап"
            style={{ resize: "none", overflow: "hidden" }}
          />
        </div>
      </div>
      <div className="popup-six-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpSix;
