import PropTypes from 'prop-types';
import style from './ToggleButton.module.scss';

const ToggleButton = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light' ? style.lightTheme : style.darkTheme;

  return (
    <button className={style.ThemeButton} onClick={toggleTheme}>
      <img
        className={isLight}
        src="https://image.flaticon.com/icons/svg/1164/1164954.svg"
        width="18"
        height="18"
        alt="Sun free icon"
        title="Sun free icon"
      />
      <img
        className={isLight}
        src="https://image.flaticon.com/icons/svg/2033/2033921.svg"
        width="18"
        height="18"
        alt="Moon free icon"
        title="Moon free icon"
      />
    </button>
  );
};

ToggleButton.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ToggleButton;
