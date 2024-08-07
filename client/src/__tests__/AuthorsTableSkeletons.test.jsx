import { render, screen } from '@testing-library/react';
import AuthorsTableSkeletons from '../components/AuthorsTableSkeletons';
import { describe, test, expect } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Вспомогательная функция для обёртки компонента необходимыми провайдерами
const renderWithProviders = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AuthorsTableSkeletons Component', () => {
  test('отрисовывает компонент с элементами скелетной загрузки', () => {
    renderWithProviders(<AuthorsTableSkeletons />);

    // Проверяем отрисовку главного контейнера
    const skeletonContainer = screen.getByTestId('author-table-skeleton');
    expect(skeletonContainer).toBeInTheDocument();

    // Проверяем наличие текстовых скелетов для основного текста
    const textSkeletons = screen.getAllByTestId(/text-skeleton-\d+/);
    expect(textSkeletons).toHaveLength(5);
  });
});
