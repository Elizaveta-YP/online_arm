import "./Navigation.css";

const NavigationArrows = ({ onBack, onForward }) => {
  return (
    <div className="navigationArrows">
      <button className="navArrow left" onClick={onBack}>
        ← Назад
      </button>
      <button className="navArrow right" onClick={onForward}>
        Вперед →
      </button>
    </div>
  );
};

export default NavigationArrows;
