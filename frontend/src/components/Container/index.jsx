import PropTypes from 'prop-types';
import './styles.css';

const Container = ({ children }) => {
  Container.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    <section className="container">
      {children}
      <div className="container-footer">
        <p>
          <a target="blank" href="https://github.com/luizDorval/finansymple">
            2024 - Finansymple By Luiz Dorval
          </a>
        </p>
      </div>
    </section>
  );
};

export default Container;
