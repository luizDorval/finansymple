import useAuth from '../../hooks/useAuth';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import './styles.css';

const CsvExport = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      !auth.filteredOperations && !auth?.operations
        ? ''
        : !auth?.filteredOperations
        ? auth.operations
        : auth.filteredOperations,
    );
  }, [auth]);

  return !data?.length ? (
    ''
  ) : (
    <CSVLink
      className="export"
      data={data?.map((d) => {
        return {
          Descrição: d?.description,
          Tipo: d?.type?.toUpperCase(),
          Valor: `R$ ${d?.value?.replace('.', ',')}`,
          'Data de Criação': new Date(d?.createdDate).toLocaleString('pt-BR', { timeZone: 'UTC' }),
        };
      })}
    >
      <FontAwesomeIcon icon={faArrowUpFromBracket} />
    </CSVLink>
  );
};

export default CsvExport;
