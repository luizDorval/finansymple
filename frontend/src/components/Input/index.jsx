import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './styles.css';

const Input = ({
  id,
  label,
  valid,
  value,
  setValue,
  type,
  autoComplete,
  focus,
  setFocus,
  instructions,
  instructionsId,
  inputRef,
  step,
  min,
  max,
  disabled,
}) => {
  Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    valid: PropTypes.bool,
    value: PropTypes.any,
    setValue: PropTypes.func,
    type: PropTypes.string,
    autoComplete: PropTypes.string,
    focus: PropTypes.bool,
    setFocus: PropTypes.func,
    instructions: PropTypes.element,
    instructionsId: PropTypes.string,
    inputRef: PropTypes.object,
    step: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    disabled: PropTypes.bool,
  };

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        ref={inputRef}
        autoComplete={autoComplete || 'on'}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          if (setFocus) setFocus(true);
        }}
        onBlur={() => {
          if (setFocus) setFocus(false);
        }}
        className={valid ? 'valid' : !value || valid === undefined ? '' : 'invalid'}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        value={value}
      />
      {!instructions ? (
        ''
      ) : (
        <p id={instructionsId} className={focus && value && !valid ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          {instructions}
        </p>
      )}
    </>
  );
};

export default Input;
