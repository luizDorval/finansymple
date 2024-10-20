import { useEffect, useRef, useState } from 'react';
import { EMAIL_REGEX, PWD_REGEX, USER_REGEX } from '../../utils/regex';
import { register } from '../../apis/finansymple';
import Input from '../../components/Input';
import './styles.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const nameRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage('');
  }, [name, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(name);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);

    if (!v1 || !v2 || !v3) {
      setErrorMessage('Cadastro Inválido');
    }

    try {
      const response = await register(name, email, password);
      setSuccess(response?.data?.message || 'Sucesso!');
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Sem resposta do servidor');
    }
  };

  return success ? (
    <section className="register">
      {success} <br />
      <span className="line">
        <Link to="/sign_in">Login</Link>
      </span>
    </section>
  ) : (
    <section className="register">
      <div className="title">Finansymple</div>

      <p
        ref={errorRef}
        className={errorMessage ? 'errorMessage' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1 className="tabTitle">Registrar-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Usuário"
          valid={validName}
          value={name}
          setValue={setName}
          type="text"
          autoComplete="off"
          focus={nameFocus}
          setFocus={setNameFocus}
          instructions={
            <>
              4 - 24 caracteres.
              <br />
              Precisa começar com uma letra.
              <br />
              Letras, números e traços permitidos.
            </>
          }
          instructionsId="uidnote"
          inputRef={nameRef}
        />

        <Input
          id="email"
          label="E-mail"
          valid={validEmail}
          value={email}
          setValue={setEmail}
          type="text"
          autoComplete="on"
          focus={emailFocus}
          setFocus={setEmailFocus}
          instructions={
            <>
              Precisa conter um @.
              <br />
              Inclua uma parte após o @.
              <br />
              Letras, números e caracteres especiais permitidos exceto parênteses e colchetes.
            </>
          }
          instructionsId="eidnote"
        />

        <Input
          id="password"
          label="Senha"
          valid={validPassword}
          value={password}
          setValue={setPassword}
          type="password"
          focus={passwordFocus}
          setFocus={setPasswordFocus}
          instructions={
            <>
              8 - 24 caracteres.
              <br />
              Precisa conter letras maíusculas e minísculas, números e caracteres especiais.
              <br />
              Caracteres especiais permitidos: !@#$%
            </>
          }
          instructionsId="pidnote"
        />

        <Input
          id="confirm_password"
          label="Confirmar Senha"
          valid={!!matchPassword && validMatch}
          value={matchPassword}
          setValue={setMatchPassword}
          type="password"
          focus={matchFocus}
          setFocus={setMatchFocus}
          instructions={<>As senhas precisam ser iguais.</>}
          instructionsId="cpidnote"
        />

        <button
          disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false}
        >
          Enviar
        </button>
        <p>
          Já tem registro? <br />
          <span className="line">
            <Link to="/sign_in">Login</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Register;
