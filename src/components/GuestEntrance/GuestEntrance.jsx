import React, { useState } from "react";
import "./GuestEntrance.css";

const GuestEntrance = ({ onClose, onSuccess }) => {
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

    if (onSuccess) {
      onSuccess(innKpp, phone);
    }
  };

  return (
    <div className="guestEntrance">
      <h2 className="subtitle">Вход</h2>
      <form onSubmit={handleSubmit} className="entranceForm">
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
            placeholder="Номер телефона"
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
            placeholder="PIN"
            required
          />
        </div>
        <div className="formActions">
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
};

export default GuestEntrance;
