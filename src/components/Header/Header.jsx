import "./Header.css";
import logo from "../../image/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Логотип ОМ365" />
      </div>
      <div className="title">Сервисная служба «Онлайн»</div>
    </header>
  );
};

export default Header;
