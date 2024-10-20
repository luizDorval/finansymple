import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import Delete from '../../pages/Operations/Delete';
import useAuth from '../../hooks/useAuth';
import Update from '../../pages/Operations/Update';

const Table = () => {
  // const [data, setData] = useState([]);
  const { auth, setAuth } = useAuth();
  const finansympleApi = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { modal, setModal } = useModal();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await finansympleApi.get('/operations', { signal: controller.signal });

        isMounted &&
          setAuth((prev) => {
            return {
              ...prev,
              operations: response.data.map((d) => {
                return {
                  createdDate: d.Data_Criacao,
                  description: d.Descricao,
                  id: d.ID,
                  userId: d.ID_Usuario,
                  type: d.Tipo,
                  value: d.Valor,
                };
              }),
            };
          });
      } catch (error) {
        alert(error?.response?.data?.message || 'Sem resposta do servidor');
        navigate('/sign_in', { state: { from: location }, replace: true });
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [modal]);

  return (
    <table id="data-table">
      <thead>
        <tr>
          <th className="thead-description">Descrição</th>
          <th className="thead-type">Tipo</th>
          <th className="thead-amount">Valor</th>
          <th className="thead-date">Data</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {!auth?.filteredOperations
          ? auth?.operations?.map(({ id, type, description, value, createdDate }, index) => (
              <tr key={index}>
                <td>{description}</td>
                <td>{type?.toUpperCase()}</td>
                <td>R$ {value.replace('.', ',')}</td>
                <td>{new Date(createdDate).toLocaleString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>
                  <FontAwesomeIcon
                    className="edit-button"
                    icon={faEdit}
                    onClick={() =>
                      setModal({
                        open: true,
                        content: (
                          <Update
                            id={id}
                            description={description}
                            type={type}
                            value={value}
                            createdDate={createdDate}
                          />
                        ),
                      })
                    }
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    className="remove-button"
                    icon={faMinusCircle}
                    onClick={() =>
                      setModal({
                        open: true,
                        content: <Delete id={id} description={description} />,
                      })
                    }
                  />
                </td>
              </tr>
            ))
          : auth?.filteredOperations?.map(
              ({ id, type, description, value, createdDate }, index) => (
                <tr key={index}>
                  <td>{description}</td>
                  <td>{type.toUpperCase()}</td>
                  <td>R$ {value.replace('.', ',')}</td>
                  <td>{new Date(createdDate).toLocaleString('pt-BR', { timeZone: 'UTC' })}</td>
                  <td>
                    <FontAwesomeIcon
                      className="edit-button"
                      icon={faEdit}
                      onClick={() =>
                        setModal({
                          open: true,
                          content: (
                            <Update
                              id={id}
                              description={description}
                              type={type}
                              value={value}
                              createdDate={createdDate}
                            />
                          ),
                        })
                      }
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      className="remove-button"
                      icon={faMinusCircle}
                      onClick={() =>
                        setModal({
                          open: true,
                          content: <Delete id={id} description={description} />,
                        })
                      }
                    />
                  </td>
                </tr>
              ),
            )}
      </tbody>
    </table>
  );
};

export default Table;
