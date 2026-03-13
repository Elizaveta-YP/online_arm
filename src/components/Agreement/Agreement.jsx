import "./Agreement.css";

const Agreement = ({ onLogin, onRegister }) => {
  return (
    <div className="agreementContainer">
      <h2 className="subtitle">Согласование</h2>
      <div className="guestButtons">
        <button onClick={onLogin}>Вход</button>
        <button onClick={onRegister}>Регистрация</button>
      </div>
    </div>
  );
};

export default Agreement;
