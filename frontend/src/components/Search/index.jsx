import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [search, setSearch] = useState('');
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (search) {
      setAuth((prev) => {
        return {
          ...prev,
          filteredOperations: auth?.operations?.filter((operation) => {
            const formattedDate = new Date(operation?.createdDate).toLocaleString('pt-BR', {
              timeZone: 'UTC',
            });

            if (
              operation?.description?.includes(search) ||
              operation?.type?.includes(search) ||
              operation?.value?.replace('.', ',')?.includes(search) ||
              formattedDate?.includes(search)
            )
              return operation;
          }),
        };
      });
    } else {
      setAuth((prev) => {
        delete prev.filteredOperations;
        return { ...prev };
      });
    }
  }, [search]);

  return (
    <div style={{ position: 'relative' }}>
      <FontAwesomeIcon
        style={{ position: 'absolute', right: '1rem', top: '0.70rem' }}
        icon={faSearch}
      />
      <input
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
