import "./HeaderEmployee.css";
import logo from "../../image/logo.png";
import exit from "../../image/exit.png";

const HeaderEmployee = ({ userPhone, fullName, onLogout }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Логотип ОМ365" />
      </div>
      <div className="header-center">
        <button className="engineerButton">Инженер</button>
      </div>
      <div className="header-user">
        <div className="userDetails">
          <p>{fullName} Зиновьев Вадим Алексеевич</p>
          <span className="userPhone">+{userPhone}</span>
        </div>
      </div>
      <div className="header-exit">
        <button className="logoutIcon" onClick={onLogout}>
          <img src={exit} alt="Выход" />
        </button>
      </div>
    </header>
  );
};

export default HeaderEmployee;
