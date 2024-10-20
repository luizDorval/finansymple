import './styles.css';
import useModal from '../../hooks/useModal';
import Create from '../../pages/Operations/Create';
import Search from '../Search';
import CsvExport from '../CsvExport';

const NewOperation = () => {
  const { modal, setModal } = useModal();

  return (
    <div className="new-operation-container">
      <div
        className="new-operation"
        onClick={() =>
          setModal({
            open: !modal.open,
            content: <Create />,
          })
        }
      >
        + Nova Operação
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <CsvExport />
        <Search />
      </div>
    </div>
  );
};

export default NewOperation;
