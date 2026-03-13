import React, { useState, useRef, useEffect } from 'react';
import SuccessModal from '../../SuccessModal/SuccessModal';
import Add from '../../../image/add.png'; 

const PaidItem = ({ request, index, onUpdate, onRemove, onFileChange, onFileRemove }) => {
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        {index > 0 && (
          <button type="button" onClick={() => onRemove(index)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
            ✕
          </button>
        )}
      </div>

      <div className="formGroup">
        <input
          className="accentBorder"
          type="text"
          id={`organization-${index}`}
          name="organization"
          value={request.organization}
          onChange={handleChange}
          placeholder="Название организации"
          required
        />
        <span className="required-star">*</span>
      </div>

      <div className="formGroup">
        <input
          className="accentBorder"
          type="text"
          id={`fullName-${index}`}
          name="fullName"
          value={request.fullName}
          onChange={handleChange}
          placeholder="ФИО ответственного"
          required
        />
        <span className="required-star">*</span>
      </div>

      <div className="formGroup">
        <input
          className="accentBorder"
          type="tel"
          id={`phone-${index}`}
          name="phone"
          value={request.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          placeholder="Номер телефона"
          required
        />
        <span className="required-star">*</span>
        {phoneError && <span className="error">{phoneError}</span>}
      </div>

      <div className="formGroup">
        <textarea
          maxLength={2000}
          className="accentBorder"
          id={`description-${index}`}
          name="description"
          value={request.description}
          onChange={handleDescriptionChange}
          ref={textareaRef}
          placeholder="Описание выполненных работ или оборудования"
          required
          style={{ resize: 'none', overflow: 'hidden' }}
        />
        <span className="required-star">*</span>
      </div>

    <div className="formGroup">
        <input
          className="accentBorder"
          type="text"
          id={`workTime-${index}`}
          name="workTime"
          value={request.workTime || ''}
          onChange={handleChange}
          placeholder="Время выполненных работ (с 12:40 до 14:50):"
        />
      </div>
    </div>
  );
};

const PaidDeparturesReport = ({ onClose = () => {} }) => {
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
        alert(`Ошибка в отчёте #${idx + 1}: неверный номер телефона`);
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
      <h2 className="subtitle">Отчет по платным выездам</h2>
      <form onSubmit={handleSubmit}>
        {requests.map((request, index) => (
          <PaidItem
            key={request.id}
            request={request}
            index={index}
            onUpdate={updateRequest}
            onRemove={removeRequest}
            onFileChange={addFilesToRequest}
            onFileRemove={removeFileFromRequest}
          />
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 10px' }}>
          <span className="addButton">
            Здесь вы можете добавить ещё один отчёт
          </span>
          <img
            src={Add}
            alt="Добавить"
            className="first-label-icon"
            onClick={addRequest}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="formActions">
          <button type="submit">Отправить</button>
        </div>
      </form>

      {showSuccess && (
        <SuccessModal
          message="Отчёт по платным выездам успешно отправлен!"
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default PaidDeparturesReport;