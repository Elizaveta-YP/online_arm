import React, { useState } from "react";
import "./GuestRegistration.css";

const GuestRegistration = ({ onClose }) => {
  const [innKpp, setInnKpp] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 11;
  };

  const handlePhoneBlur = (e) => {
    const value = e.target.value;
    if (!validatePhone(value) && value.trim() !== "") {
      setPhoneError("Некорректный номер телефона");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError("Некорректный номер телефона");
      return;
    }

    alert("Заявка отправлена на рассмотрение");
  };

  return (
    <div className="guestRegistration">
      <h2 className="subtitle">Регистрация</h2>
      <form onSubmit={handleSubmit} className="registrationForm">
        <div className="formGroup">
          <input
            type="text"
            className="accentBorder"
            value={innKpp}
            onChange={(e) => setInnKpp(e.target.value)}
            placeholder="ИНН/КПП"
            required
          />
        </div>
        <div className="formGroup">
          <input
            type="tel"
            className="accentBorder"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={handlePhoneBlur}
            placeholder="Введите номер телефона"
            required
          />
          {phoneError && <span className="error">{phoneError}</span>}
        </div>
        <div className="formGroup">
          <input
            type="password"
            className="accentBorder"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="ФИО"
            required
          />
        </div>
        <div className="formActions">
          <button type="submit">Отправить на рассмотрение</button>
        </div>
      </form>
    </div>
  );
};

export default GuestRegistration;
