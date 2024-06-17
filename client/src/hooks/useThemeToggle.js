import { useContext } from 'react';
import { ThemeToggleContext } from '../contexts/ThemeToggleContext';

export const useThemeToggle = () => useContext(ThemeToggleContext);
