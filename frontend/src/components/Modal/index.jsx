import './styles.css';
import useModal from '../../hooks/useModal';

const Modal = () => {
  const { modal, setModal } = useModal();

  return (
    <div
      className={modal?.open ? 'modal-overlay active' : 'modal-overlay'}
      onClick={(e) => {
        const classList = e.target.classList;
        if (classList.contains('modal-overlay') || classList.contains('cancel')) {
          setModal({ open: false });
        }
      }}
    >
      <div className="modal">{modal?.content}</div>
    </div>
  );
};

export default Modal;
