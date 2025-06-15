import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = ({ buttonClassName, spanClassName }) => {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <button onClick={toggleTheme} className={buttonClassName}>
        <span
          className={`
            ${spanClassName}
            ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
          `}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </span>
      </button>
    );
  };

export default ThemeSwitcher;
