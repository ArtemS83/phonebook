import PropTypes from 'prop-types';
import style from './Button.module.scss';

const Button = ({ title, type, onClick }) => {
  return (
    <button
      data-testid="onClickFn"
      className={type === 'button' ? style.buttonButton : style.button}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: 'Click me',
  type: 'button',
  onClick: () => {},
};

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
