import { useEffect, useRef, useState } from 'react';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import { login } from '../../apis/finansymple';
import './styles.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken, id: response?.data?.id });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Sem resposta do servidor');
    }
  };

  return (
    <section className="login">
      <div className="title">Finansymple</div>

      <p
        ref={errorRef}
        className={errorMessage ? 'errorMessage' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1 className="tabTitle">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="E-mail"
          value={email}
          setValue={setEmail}
          type="email"
          inputRef={userRef}
        />
        <Input
          id="password"
          label="Senha"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <button disabled={!email || !password}>Entrar</button>
        <p>
          Precisa de uma conta?
          <br />
          <span className="line">
            <Link to="/sign_up">Registrar-se</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
