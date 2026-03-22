import React, { useState, useRef, useEffect } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import "./popUpFour.css";

const PopUpFour = ({ onBack }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSave = () => {
    console.log("Сохранённый текст:", text);
    onBack();
  };

  return (
    <div className="popup-four">
      <h2 className="popup-four-title">Введите необходимые изменения</h2>
      <div className="field">
        <textarea
          maxLength={2000}
          id="additionalWorks"
          className="accentBorder accentBorderFile"
          name="additionalWorks"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textareaRef}
          placeholder="Разъем мотора для имплантмед"
          style={{ resize: "none", overflow: "hidden" }}
        />
      </div>
      <div className="popup-four-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpFour;