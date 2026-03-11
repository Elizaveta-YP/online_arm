import React, { useState, useRef, useEffect } from 'react';
import './RepairRequestForm.css'; 
import SuccessModal from '../SuccessModal/SuccessModal';

const RepairRequestItem = ({ request, index, onUpdate, onRemove, onFileChange, onFileRemove }) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [request.problemDescription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(index, { [name]: value });
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    onUpdate(index, { [name]: value });
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChangeInternal = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      onFileChange(index, selectedFiles);
    }
    e.target.value = null;
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  };

  const handlePhoneBlur = (e) => {
    const phone = e.target.value;
    if (!validatePhone(phone) && phone.trim() !== '') {
      setPhoneError('Некорректный номер телефона');
    } else {
      setPhoneError('');
    }
  };

  const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  if (slots[slots.length - 1] === '20:30') slots.pop();
  return slots;
};

const timeSlots = generateTimeSlots();

  return (
    <div className="requestItem">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>Заявка на ремонт №{index + 1}</h3>
        {index > 0 && (
          <button type="button" onClick={() => onRemove(index)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor={`phone-${index}`}>Номер телефона</label>
        <input
          className="accentBorder"
          type="tel"
          id={`phone-${index}`}
          name="phone"
          value={request.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          required
        />
        {phoneError && <span className="error">{phoneError}</span>}
      </div>

      <div className="formGroup">
        <label htmlFor={`organization-${index}`}>Название организации</label>
        <input
          className="accentBorder"
          type="text"
          id={`organization-${index}`}
          name="organization"
          value={request.organization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor={`fullName-${index}`}>ФИО ответственного</label>
        <input
          className="accentBorder"
          type="text"
          id={`fullName-${index}`}
          name="fullName"
          value={request.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor={`problem-${index}`}>Опишите вашу проблему</label>
        <textarea
          maxLength={2000}
          className="accentBorder"
          id={`problem-${index}`}
          name="problemDescription"
          value={request.problemDescription}
          onChange={handleDescriptionChange}
          ref={textareaRef}
          required
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </div>

      <div className="formGroup" style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor={`date-${index}`}>Желаемая дата</label>
          <input
            className="accentBorder"
            type="date"
            id={`date-${index}`}
            name="desiredDate"
            value={request.desiredDate}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1 }}>
            <label htmlFor={`time-${index}`}>Желаемое время</label>
            <select
                className="accentBorder"
                id={`time-${index}`}
                name="desiredTime"
                value={request.desiredTime}
                onChange={handleChange}
                style={{ padding: '8px', width: '100%' }}
            >
                <option value="" disabled>Выберите время</option>
                {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
                ))}
            </select>
        </div>
    </div>

      <div className="formGroup">
        <label>Приложите фото или видео:</label>
        <div className="customFileUpload">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChangeInternal}
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="fileUploadButton"
            onClick={handleFileButtonClick}
          >
            <span style={{ transform: 'rotate(45deg)', display: 'inline-block' }}>✕</span>
          </button>
        </div>
        {request.files.length > 0 && (
          <div className="fileList">
            {request.files.map((file, fileIndex) => (
              <div key={fileIndex} className="fileItem">
                <span>{file.name}</span>
                <button type="button" onClick={() => onFileRemove(index, fileIndex)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RepairRequestForm = ({ onClose }) => {
  const [requests, setRequests] = useState([
    {
      id: Date.now(),
      phone: '',
      organization: '',
      fullName: '',
      problemDescription: '',
      desiredDate: '',
      desiredTime: '',
      files: [],
    }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

// ДОБАВИТЬ ЗАЯВКУ, НЕ УБИРАЕМ ПОЛЯ, А ДОБАВЛЯЕМ РАНЕЕ ВВЕДЁННЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  const addRequest = () => {
    const lastRequest = requests[requests.length - 1];
    setRequests([
      ...requests,
      {
        id: Date.now() + Math.random(),
        phone: lastRequest.phone,
        organization: lastRequest.organization,
        fullName: lastRequest.fullName,
        problemDescription: '',
        desiredDate: '',
        desiredTime: '',
        files: [],
      }
    ]);
  };

  const updateRequest = (index, updatedFields) => {
    setRequests(prev => prev.map((req, i) => i === index ? { ...req, ...updatedFields } : req));
  };

  const removeRequest = (index) => {
    setRequests(prev => prev.filter((_, i) => i !== index));
  };

  const addFilesToRequest = (index, newFiles) => {
    setRequests(prev => prev.map((req, i) => i === index ? { ...req, files: [...req.files, ...newFiles] } : req));
  };

  const removeFileFromRequest = (requestIndex, fileIndex) => {
    setRequests(prev => prev.map((req, i) => i === requestIndex ? { ...req, files: req.files.filter((_, fIdx) => fIdx !== fileIndex) } : req));
  };

  // ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    requests.forEach((req, idx) => {
      const digits = req.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        alert(`Ошибка в заявке #${idx + 1}: неверный номер телефона`);
        hasErrors = true;
      }
    });
    if (hasErrors) return;

    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <div className="partRequestForm"> 
      <h2>Подать заявку на ремонт оборудования</h2>
      <form onSubmit={handleSubmit}>
        {requests.map((request, index) => (
          <RepairRequestItem
            key={request.id}
            request={request}
            index={index}
            onUpdate={updateRequest}
            onRemove={removeRequest}
            onFileChange={addFilesToRequest}
            onFileRemove={removeFileFromRequest}
          />
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button className="addButton" type="button" onClick={addRequest}>
            Создать еще одну заявку
          </button>
        </div>

        <div className="formActions">
          <button type="submit">Отправить</button>
        </div>
      </form>

      {showSuccess && (
        <SuccessModal
          message="Заявка на ремонт успешно отправлена!"
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default RepairRequestForm;