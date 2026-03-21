import HeaderGuest from "../Header/HeaderGuest";
import questionImg from "../../image/question.png";
import "./ScheduleApproval.css";

const ScheduleApproval = ({
  onClose,
  phone,
  innKpp,
  onSparePart,
  onRepair,
}) => {
  const rows = 8;
  const columns = 10;

  const columnHeaders = [
    "№",
    "Отметка времени",
    "Автор заявки",
    "Фото",
    "Описание запчастей",
    "Срок доставки",
    "Цена",
    "Статус согласования",
    "Статус заказа",
    "Вопросы по заказу",
  ];

  const textColumns = [
    "Описание запчастей",
    "Срок доставки",
    "Цена",
    "Статус согласования",
    "Статус заказа",
  ];

  const imageColumns = {
    "Вопросы по заказу": questionImg,
  };
  return (
    <div className="scheduleApproval">
      <HeaderGuest
        phone={phone}
        innKpp={innKpp}
        onSparePart={onSparePart}
        onRepair={onRepair}
      />
      <div className="tableContainer">
        <table className="scheduleTable">
          <thead>
            <tr>
              {columnHeaders.map((header, index) => (
                <th key={index} className={index === 0 ? "numberColumn" : ""}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(rows)
              .fill()
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="numberColumn">
                    <span className="rowNumber">{rowIndex + 1}</span>
                  </td>
                  {Array(columns - 1)
                    .fill()
                    .map((_, colIndex) => {
                      const header = columnHeaders[colIndex + 1];

                      if (header === "Отметка времени") {
                        const now = new Date();
                        const dateTime = now.toLocaleString();
                        return <td key={colIndex}>{dateTime}</td>;
                      }

                      if (textColumns.includes(header)) {
                        return <td key={colIndex}>—</td>;
                      }

                      if (imageColumns[header]) {
                        return (
                          <td key={colIndex} className="imageCell">
                            <img
                              src={imageColumns[header]}
                              className="imageCellImg"
                            />
                          </td>
                        );
                      }

                      return (
                        <td key={colIndex}>
                          <input
                            type="text"
                            placeholder={header}
                            className="scheduleCell"
                          />
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleApproval;
