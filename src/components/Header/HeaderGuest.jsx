import "./HeaderGuest.css";
import logo from "../../image/logo.png";
import profileIcon from "../../image/exit.png";

const HeaderGuest = ({ phone, innKpp, onSparePart, onRepair }) => {
  return (
    <header className="headerGuest">
      <div className="headerGuest-logo">
        <img src={logo} alt="Логотип ОМ365" />
      </div>
      <div className="headerGuest-center">
        <div className="centerButtons">
          <button className="guestButton" onClick={onSparePart}>
            Заявка на запчасть
          </button>
          <button className="guestButton" onClick={onRepair}>
            Заявка на выезд
          </button>
        </div>
      </div>
      <div className="headerGuest-user">
        <div className="userDetails">
          <div className="userInn">ИНН/КПП {innKpp}</div>
          <div className="userPhone">+{phone}</div>
        </div>
        <div className="headerGuest-profile">
          <img src={profileIcon} alt="Профиль" />
        </div>
      </div>
    </header>
  );
};

export default HeaderGuest;
