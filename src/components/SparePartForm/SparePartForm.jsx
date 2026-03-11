import React, { useState, useRef, useEffect } from 'react';
import './SparePartForm.css';
import SuccessModal from '../SuccessModal/SuccessModal';

const RequestItem = ({ request, index, onUpdate, onRemove, onFileChange, onFileRemove }) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [request.description]);

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

  return (
    <div className="requestItem">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>Заявка №{index + 1}</h3>
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
        <label htmlFor={`description-${index}`}>Описание запчасти (обязательно пишите количество)</label>
        <textarea
          maxLength={1500}
          className="accentBorder"
          id={`description-${index}`}
          name="description"
          value={request.description}
          onChange={handleDescriptionChange}
          ref={textareaRef}
          required
          style={{ resize: 'none', overflow: 'hidden' }}
        />
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
            <button type="button" onClick={() => onRemove(index)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', transform: 'rotate(45deg)'}}>✕</button>
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

const SparePartForm = ({ onClose }) => {
  const [requests, setRequests] = useState([
    {
      id: Date.now(),
      phone: '',
      organization: '',
      fullName: '',
      description: '',
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
        description: '',                    
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
      <h2>Подать заявку на запчасть</h2>
      <form onSubmit={handleSubmit}>
        {requests.map((request, index) => (
          <RequestItem
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
          message="Заявка успешно отправлена!"
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default SparePartForm;