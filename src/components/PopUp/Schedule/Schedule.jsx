import React, { useState, useRef, useEffect } from "react";
import "./Schedule.css";
import no from "../../../image/no.png";
import yes from "../../../image/yes.png";

const Schedule = ({ onBack }) => {
  const initialData = {
    employee: "Иванов Иван Иванович",
    time: "11:00 - 12:00",
    client: "Пушкина 1",
    task: "Ремонт оборудования",
    additionalWorks: "",
    images: [],
  };

  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialData });
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.additionalWorks]);

  const handleEditClick = () => {
    setEditData({ ...data });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setData({ ...editData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "additionalWorks") {
      setData((prev) => ({ ...prev, [name]: value }));
    } else if (isEditing) {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="schedule">
      <div className="scheduleInfo">
        {isEditing ? (
          <>
            <div className="field">
              <label>Сотрудник:</label>
              <input
                type="text"
                name="employee"
                value={editData.employee}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Время:</label>
              <input
                type="text"
                name="time"
                value={editData.time}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Клиент:</label>
              <input
                type="text"
                name="client"
                value={editData.client}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Задача:</label>
              <input
                type="text"
                name="task"
                value={editData.task}
                onChange={handleChange}
              />
            </div>
            <div className="buttons">
              <button className="saveButton" onClick={handleSave}>
                Сохранить
              </button>
              <button className="cancelButton" onClick={handleCancel}>
                Отмена
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Сотрудник:</strong> {data.employee}
            </p>
            <p>
              <strong>Время:</strong> {data.time}
            </p>
            <p>
              <strong>Клиент:</strong> {data.client}
            </p>
            <p>
              <strong>Задача:</strong> {data.task}
            </p>
          </>
        )}

        <div className="field">
          <textarea
            maxLength={2000}
            id="additionalWorks"
            className="accentBorder accentBorderFile"
            name="additionalWorks"
            rows="4"
            value={data.additionalWorks}
            onChange={handleChange}
            ref={textareaRef}
            placeholder="Дополнительно выполненные работы"
            style={{ resize: "none", overflow: "hidden" }}
          />
        </div>

        <div className="images">
          <img src={no} alt="Нет" />
          <img src={yes} alt="Да" />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
