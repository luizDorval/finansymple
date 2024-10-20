import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/sign_in');
    } catch (error) {
      alert(error?.response?.data?.message || 'Sem resposta do servidor');
    }
  };

  return (
    <header className="header">
      <div className="title">Finansymple</div>
      <FontAwesomeIcon className="logout-icon" icon={faRightFromBracket} onClick={handleLogout} />
    </header>
  );
};

export default Header;
