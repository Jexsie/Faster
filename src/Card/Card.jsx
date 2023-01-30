import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Card = () => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <h2>Add Account</h2>
          </div>
          <div className="default">
            <FontAwesomeIcon icon={faCirclePlus} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
