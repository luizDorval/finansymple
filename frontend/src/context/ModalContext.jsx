import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  ModalProvider.propTypes = {
    children: PropTypes.element,
  };
  const [modal, setModal] = useState({ open: false });

  return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};

export default ModalContext;
