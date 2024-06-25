import { useContext } from 'react';
import { ThemeToggleContext } from '../contexts/ThemeToggleContext';
// import { ThemeToggleContext } from '../contexts/ThemeContext';

export const useThemeToggle = () => useContext(ThemeToggleContext);
