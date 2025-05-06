import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 border rounded"
        >
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    )
}

export default ThemeSwitcher;
