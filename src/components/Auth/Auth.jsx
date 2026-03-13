import "./Auth.css";
import Header from "../Header/Header";

const LoginForm = ({ onLogin }) => {
  const guest = () => {
    onLogin({ role: "guest" });
  };

  const employee = () => {
    onLogin({ role: "employee" });
  };

  return (
    <>
      <Header />
      <div className="role">
        <div className="buttonGroup">
          <button onClick={guest}>Гость</button>
          <button onClick={employee}>Сотрудник</button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
