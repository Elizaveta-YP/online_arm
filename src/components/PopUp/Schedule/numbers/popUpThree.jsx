import React, { useState, useRef, useEffect } from "react";
import no from "../../../../image/no.png";
import yes from "../../../../image/yes.png";
import choice from "../../../../image/choice.png";
import choiceAfter from "../../../../image/choiceAfter.png";
import addIcon from "../../../../image/add.png";
import "./popUpThree.css";

const PopUpThree = ({ onBack }) => {
  const engineers = [
    "Глухих Дмитрий Васильевич",
    "Минин Денис Игоревич",
    "Ткаченко Сергей Александрович",
    "Кошеев Виктор Сергеевич",
    "Мотошков Илья Александрович",
  ];

  const [tasks, setTasks] = useState([
    {
      selectedEngineer: null,
      client: "",
      taskDescription: "",
      files: [],
    },
  ]);

  const fileInputRefs = useRef([]);

  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, tasks.length);
  }, [tasks.length]);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        selectedEngineer: null,
        client: "",
        taskDescription: "",
        files: [],
      },
    ]);
  };

  const handleEngineerSelect = (taskIndex, engineerIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].selectedEngineer =
      updatedTasks[taskIndex].selectedEngineer === engineerIndex
        ? null
        : engineerIndex;
    setTasks(updatedTasks);
  };

  const handleClientChange = (taskIndex, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].client = value;
    setTasks(updatedTasks);
  };

  const handleDescriptionChange = (taskIndex, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].taskDescription = value;
    setTasks(updatedTasks);
  };

  const handleFileButtonClick = (taskIndex) => {
    if (fileInputRefs.current[taskIndex]) {
      fileInputRefs.current[taskIndex].click();
    }
  };

  const handleFileChange = (taskIndex, e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].files = [
        ...updatedTasks[taskIndex].files,
        ...newFiles,
      ];
      setTasks(updatedTasks);
    }
    e.target.value = "";
  };

  const handleFileRemove = (taskIndex, fileIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].files = updatedTasks[taskIndex].files.filter(
      (_, idx) => idx !== fileIndex,
    );
    setTasks(updatedTasks);
  };

  const handleSave = () => {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (
        task.selectedEngineer === null ||
        !task.client.trim() ||
        !task.taskDescription.trim()
      ) {
        alert(
          `Пожалуйста, заполните все обязательные поля в задаче ${i + 1}: выберите инженера, укажите клиента и описание задачи`,
        );
        return;
      }
    }
    console.log(
      "Отправка задач:",
      tasks.map((task) => ({
        engineer:
          task.selectedEngineer !== null
            ? engineers[task.selectedEngineer]
            : null,
        client: task.client,
        taskDescription: task.taskDescription,
        files: task.files.map((f) => f.name),
      })),
    );
    onBack();
  };

  return (
    <div className="popup-three">
      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="task-block">
          <div className="popup-three-header">
            <h2 className="popup-three-title">
              Выберите инженера
              <span className="required-star">*</span>
            </h2>
          </div>

          <div className="engineers-list">
            {engineers.map((name, idx) => (
              <button
                key={idx}
                className={`engineer-button ${task.selectedEngineer === idx ? "selected" : ""}`}
                onClick={() => handleEngineerSelect(taskIndex, idx)}
              >
                <img
                  src={task.selectedEngineer === idx ? choiceAfter : choice}
                  alt="Выбрать"
                  className="engineer-icon"
                />
                {name}
              </button>
            ))}
          </div>

          <h3 className="popup-three-subtitle">Внесите данные</h3>

          <div className="data-fields">
            <div className="field">
              <textarea
                value={task.client}
                onChange={(e) => handleClientChange(taskIndex, e.target.value)}
                placeholder="Клиент"
                rows="1"
                className="accentBorders"
                style={{ resize: "none", overflow: "hidden" }}
              />
              <span className="stars">*</span>
            </div>

            <div className="field">
              <textarea
                value={task.taskDescription}
                onChange={(e) =>
                  handleDescriptionChange(taskIndex, e.target.value)
                }
                placeholder="Описание задачи"
                rows="2"
                className="accentBorders"
                style={{ resize: "none", overflow: "hidden" }}
              />
              <span className="stars">*</span>
            </div>

            <div className="fileUploadWrapper">
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[taskIndex] = el)}
                onChange={(e) => handleFileChange(taskIndex, e)}
                accept="image/*,video/*"
                multiple
                style={{ display: "none" }}
              />
              {task.files.length === 0 ? (
                <button
                  type="button"
                  className="fileUploadButton"
                  onClick={() => handleFileButtonClick(taskIndex)}
                >
                  Приложите фото или видео
                  <img src={addIcon} alt="Добавить" />
                </button>
              ) : (
                <div
                  className="fileUploadButton fileListMode"
                  onClick={() => handleFileButtonClick(taskIndex)}
                >
                  <div className="fileList">
                    {task.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="fileItem">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileRemove(taskIndex, fileIndex);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <img src={addIcon} alt="Добавить" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="addTaskControls">
        <img
          src={addIcon}
          alt="Добавить задачу"
          className="addTaskIcon"
          onClick={handleAddTask}
        />
      </div>

      <div className="popup-three-actions">
        <img src={no} alt="Нет" onClick={onBack} className="action-icon" />
        <img src={yes} alt="Да" onClick={handleSave} className="action-icon" />
      </div>
    </div>
  );
};

export default PopUpThree;
