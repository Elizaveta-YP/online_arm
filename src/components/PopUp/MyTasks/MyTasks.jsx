import React, { useState, useRef, useEffect } from "react";
import "./MyTasks.css";
import yes from "../../../image/yes.png";
import no from "../../../image/no.png";

// ПРИМЕР МАССИВА
const initialTasks = [
  {
    id: 1,
    employee: "Иванов Иван",
    client: 'ООО "Онлайн"',
    task: "Провести диагностику оборудования",
  },
  {
    id: 2,
    employee: "Иванов Иван",
    client: 'ООО "Онлайн"',
    task: "Заменить расходные материалы",
  },
];

const MyTasks = ({ onBack }) => {
  const [details, setDetails] = useState({});
  const textareaRefs = useRef({});

  const handleDetailsChange = (id, value) => {
    setDetails((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    initialTasks.forEach((task) => {
      const textarea = textareaRefs.current[task.id];
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [details]);

  const handleYes = (taskId) => {
    console.log(`Задача ${taskId} подтверждена`);
  };

  const handleNo = (taskId) => {
    console.log(`Задача ${taskId} отклонена`);
  };

  return (
    <div className="page">
      <h2 className="buttonTask">Мои задачи</h2>

      {initialTasks.map((task) => (
        <div key={task.id} className="taskContent">
          <h3 className="taskText">От сотрудника: {task.employee}</h3>
          <h3 className="taskText">Клиент: {task.client}</h3>
          <p className="taskText">Задача: {task.task}</p>

          <form>
            <textarea
              ref={(el) => (textareaRefs.current[task.id] = el)}
              maxLength={2000}
              className="task accentBorders"
              value={details[task.id] || ""}
              onChange={(e) => handleDetailsChange(task.id, e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Дополнительные детали"
              rows={3}
              style={{ resize: "none", overflow: "hidden" }}
            />
          </form>

          <div className="actionButtons">
            <button className="imgButton" onClick={() => handleNo(task.id)}>
              <img className="imgButton" src={no} alt="Нет" />
            </button>
            <button className="imgButton" onClick={() => handleYes(task.id)}>
              <img className="imgButton" src={yes} alt="Да" />
            </button>
          </div>
          <div className="fullWidthSeparator"></div>
        </div>
      ))}
    </div>
  );
};

export default MyTasks;
