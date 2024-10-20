import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useModal from '../../../hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../components/Input';
import './styles.css';

const Update = ({ id, description, type, value, createdDate }) => {
  Update.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    createdDate: PropTypes.string,
  };

  const [localDescription, setLocalDescription] = useState(description);
  const [localType, setLocalType] = useState(type);
  const [localValue, setLocalValue] = useState(value);
  const [localCreatedDate, setLocalCreatedDate] = useState(createdDate.replace('Z', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef();
  const finansympleApi = useAxiosPrivate();
  const { setModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localType === 'receita' && localValue < 0.01) {
      setErrorMessage('Receitas devem ter o valor maior do que 0');
      return;
    }

    if (localType === 'despesa' && localValue > -0.01) {
      setErrorMessage('Despesas devem ter o valor menor do que 0');
      return;
    }

    const formattedValue = Number(localValue?.replace(',', '.'));
    const formattedDate = `${localCreatedDate?.replace('T', ' ')}`;

    try {
      await finansympleApi.put(`/operations/${id}`, {
        description: localDescription,
        type: localType,
        value: formattedValue,
        createdDate: formattedDate,
      });
      setModal({ open: false });
      alert('Operação realizada com sucesso');
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Erro, tente novamente mais tarde');
    }
  };

  return (
    <div className="update-operation-modal">
      <p
        ref={errorRef}
        className={errorMessage ? 'errorMessage' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1 className="tabTitle">Editando a operação: {description}</h1>
      <FontAwesomeIcon className="cancel" icon={faClose} />
      <form className="update-operation-form" onSubmit={handleSubmit}>
        <Input
          id="description"
          label="Descrição"
          value={localDescription}
          setValue={setLocalDescription}
          type="text"
          autoComplete="off"
        />
        <label htmlFor="type">Tipo</label>
        <select value={localType} onChange={(e) => setLocalType(e.target.value)} id="type">
          <option value=""></option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <Input
          id="value"
          label="Valor"
          type="number"
          value={localValue}
          setValue={setLocalValue}
          step="0.01"
          disabled={!type}
        />
        <Input
          id="createdDate"
          label="Data de Criação"
          value={localCreatedDate}
          setValue={setLocalCreatedDate}
          type="datetime-local"
        />
        <button disabled={!localDescription || !localType || !localValue || !localCreatedDate}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Update;
