import React, { useState } from "react";
import "./Documents.css";
import Add from "../../../image/add.png";

const Documents = ({ onBack }) => {
  const [requests, setRequests] = useState([
    { organization: "", documents: "" },
  ]);

  const addRequest = () => {
    setRequests([...requests, { organization: "", documents: "" }]);
  };

  const handleRequestChange = (index, field, value) => {
    const updated = [...requests];
    updated[index][field] = value;
    setRequests(updated);
  };

  const handleSubmit = () => {
    const isValid = requests.every(
      (req) => req.organization.trim() !== "" && req.documents.trim() !== "",
    );
    if (!isValid) {
      alert("Пожалуйста, заполните все поля для каждой заявки");
      return;
    }
    console.log("Документы:", requests);
    alert("Данные отправлены");
    onBack();
  };

  return (
    <div className="documents">
      <h2 className="documents-title">Документы</h2>
      {requests.map((request, index) => (
        <div key={index} className="request-block">
          <textarea
            className="documents-textarea"
            rows="3"
            value={request.organization}
            onChange={(e) =>
              handleRequestChange(index, "organization", e.target.value)
            }
            placeholder="Название организации"
          />
          <textarea
            className="documents-textarea"
            rows="3"
            value={request.documents}
            onChange={(e) =>
              handleRequestChange(index, "documents", e.target.value)
            }
            placeholder="Какие документы требуется отвезти"
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 10px",
        }}
      >
        <span className="addButton">
          Здесь вы можете добавить ещё одну заявку
        </span>
        <img
          src={Add}
          alt="Добавить"
          className="first-label-icon"
          onClick={addRequest}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="formActions">
        <button type="submit">Отправить</button>
      </div>
    </div>
  );
};

export default Documents;
