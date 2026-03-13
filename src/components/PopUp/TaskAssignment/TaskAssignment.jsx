import React, { useState, useRef, useEffect } from 'react';
import './TaskAssignment.css';
import choice from '../../../image/choice.png';
import choiceAfter from '../../../image/choiceAfter.png';
import Add from '../../../image/add.png';
import SuccessModal from '../../SuccessModal/SuccessModal';

const TaskAssignment = ({ onBack }) => {
  const [tasks, setTasks] = useState([
    { selectedIndex: null, client: '', taskDescription: '' }
  ]);
  const textareaRefs = useRef([]);

  const handleAddTask = () => {
    setTasks([...tasks, { selectedIndex: null, client: '', taskDescription: '' }]);
  };

    useEffect(() => {
    tasks.forEach((_, index) => {
      const textarea = textareaRefs.current[index];
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [tasks]);

  const handleTaskSelect = (taskIndex, buttonIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].selectedIndex = 
      updatedTasks[taskIndex].selectedIndex === buttonIndex ? null : buttonIndex;
    setTasks(updatedTasks);
  };

  const handleTaskChange = (taskIndex, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex][field] = value;
    setTasks(updatedTasks);
  };

  const handleDescriptionChange = (taskIndex, e) => {
    const { value } = e.target;
    handleTaskChange(taskIndex, 'taskDescription', value);
    const textarea = textareaRefs.current[taskIndex];
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();
 
  const isValid = tasks.every(task => 
    task.selectedIndex !== null && 
    task.client.trim() !== '' && 
    task.taskDescription.trim() !== ''
  );

  if (!isValid) {
    alert('Пожалуйста, заполните все обязательные поля для каждой задачи (выбор сотрудника, клиент, описание)');
    return;
  }

  console.log('Отправка заявок:', tasks);
  setShowSuccessModal(true); 
};

  const buttons = [
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeModal = () => setShowSuccessModal(false);

  return (
    <div className="page">
      <h2 className="pageTitleTask pageTitleTasks">Поставить задачи</h2>

      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="taskBlock">
          <button className="addButton addButtonTask" type="button" onClick={handleAddTask}>
          Выберите ответственного
        </button>

          <div className="taskButtons">
            {buttons.map((text, btnIndex) => (
              <button
                key={btnIndex}
                className={`taskButton ${btnIndex < 5 ? 'engineersButtons' : ''}`}
                onClick={() => handleTaskSelect(taskIndex, btnIndex)}
              >
                <img
                  src={task.selectedIndex === btnIndex ? choiceAfter : choice}
                  alt="Выбрать"
                  className="buttonIcon"
                />
                {text}
              </button>
            ))}
          </div>
<button className="addButton addButtonTask" type="button" onClick={handleAddTask}>
          Внесите данные
        </button>
          <div className="formContainer">
            <div className="formGroups formGroupsTask">
              <input
                type="text"
                value={task.client}
                onChange={(e) => handleTaskChange(taskIndex, 'client', e.target.value)}
                placeholder="Клиент"
                required
                className="accentBorders"
              />
              <span className="stars">*</span>
            </div>
            <div className="formGroups formGroupsTask">
              <textarea
                ref={el => textareaRefs.current[task.id] = el} 
                type="text"
                maxLength={2000}
                value={task.taskDescription}
                onChange={(e) => handleTaskChange(taskIndex, 'taskDescription', e.target.value)}
                onInput={(e) => { 
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Описание задачи"
                rows={1}
                required
                className="accentBorders"
                style={{ resize: 'none', overflow: 'hidden' }}
              />
              <span className="stars">*</span>
            </div>
          </div>
        </div>
      ))}

      <div className="addTaskControls">
        <img
          src={Add}
          alt="Добавить"
          className="addIcon"
          onClick={handleAddTask}
        />
      </div>

      <div className="formActions">
        <button type="submit" onClick={handleSubmit}>Отправить</button>
      </div>

     {showSuccessModal && (
        <SuccessModal
          message="Успешно!"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TaskAssignment;