import Input from '../../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import useModal from '../../../hooks/useModal';

const Create = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [createdDate, setCreatedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useAuth();
  const userRef = useRef();
  const errorRef = useRef();
  const finansympleApi = useAxiosPrivate();
  const { setModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'receita' && value < 0.01) {
      setErrorMessage('Receitas devem ter o valor maior do que 0');
      return;
    }

    if (type === 'despesa' && value > -0.01) {
      setErrorMessage('Despesas devem ter o valor menor do que 0');
      return;
    }

    const formattedValue = Number(value?.replace(',', '.'));
    const formattedDate = `${createdDate?.replace('T', ' ')}:00`;

    try {
      await finansympleApi.post('/operations', {
        description,
        type,
        value: formattedValue,
        createdDate: formattedDate,
        userId: auth?.id,
      });
      setModal({ open: false });
      alert('Operação adicionada com sucesso');
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Erro, tente novamente mais tarde');
    }
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  return (
    <div className="new-operation-modal">
      <p
        ref={errorRef}
        className={errorMessage ? 'errorMessage' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1 className="tabTitle">Nova Operação</h1>

      <FontAwesomeIcon className="cancel" icon={faClose} />
      <form className="new-operation-form" onSubmit={handleSubmit}>
        <Input
          id="description"
          label="Descrição"
          value={description}
          setValue={setDescription}
          type="text"
          autoComplete="off"
        />
        <label htmlFor="type">Tipo</label>
        <select onChange={(e) => setType(e.target.value)} id="type">
          <option value=""></option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <Input
          id="value"
          label="Valor"
          type="number"
          value={value}
          setValue={setValue}
          step="0.01"
          disabled={!type}
        />
        <Input
          id="createdDate"
          label="Data de Criação"
          value={createdDate}
          setValue={setCreatedDate}
          type="datetime-local"
        />
        <button disabled={!description || !type || !value || !createdDate}>Enviar</button>
      </form>
    </div>
  );
};

export default Create;
