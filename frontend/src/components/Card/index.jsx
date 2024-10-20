import { faArrowDown, faArrowUp, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './styles.css';

const Card = ({ className, name, value, type }) => {
  Card.propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    type: PropTypes.number.isRequired,
  };

  return (
    <div className={className}>
      <h3>
        {name}
        {type === 2 ? (
          <FontAwesomeIcon className="card-icon" icon={faDollarSign} color="white" />
        ) : type ? (
          <FontAwesomeIcon className="card-icon" icon={faArrowUp} color="var(--my-green)" />
        ) : (
          <FontAwesomeIcon className="card-icon" icon={faArrowDown} color="var(--my-red)" />
        )}
      </h3>
      <p id="incomeDisplay">{value}</p>
    </div>
  );
};

export default Card;
