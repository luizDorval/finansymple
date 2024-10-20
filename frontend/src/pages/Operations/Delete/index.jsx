import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useModal from '../../../hooks/useModal';
import PropTypes from 'prop-types';
import './styles.css';

const Delete = ({ id, description }) => {
  Delete.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef();
  const finansympleApi = useAxiosPrivate();
  const { setModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await finansympleApi.delete(`/operations/${id}`);
      setModal({ open: false });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Erro, tente novamente mais tarde');
    }
  };
  return (
    <div className="delete-operation-modal">
      <p
        ref={errorRef}
        className={errorMessage ? 'errorMessage' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1 className="tabTitle">Remover Operação: {description}</h1>
      <FontAwesomeIcon className="cancel" icon={faClose} />
      Você tem certeza que deseja remover a operação {description}?
      <form className="delete-operation-form" onSubmit={handleSubmit}>
        <button className="cancel-button">Cancelar</button>
        <button>Remover</button>
      </form>
    </div>
  );
};

export default Delete;
