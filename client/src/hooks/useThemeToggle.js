import { useContext } from 'react';
import { ThemeToggleContext } from '../contexts/ThemeContext';

export const useThemeToggle = () => useContext(ThemeToggleContext);
