import { render, screen } from '@testing-library/react';
import AuthorFormSkeleton from '../components/AuthorFormSkeleton';
import { describe, test, expect } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Вспомогательная функция для обёртки компонента необходимыми провайдерами
const renderWithProviders = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AuthorDetailsSkeleton Component', () => {
  test('отрисовывает компонент с элементами скелетной загрузки', () => {
    renderWithProviders(<AuthorFormSkeleton />);

    // Проверяем отрисовку главного контейнера
    const skeletonContainer = screen.getByTestId('author-form-skeleton');
    expect(skeletonContainer).toBeInTheDocument();

    // Проверяем наличие скелетов для полей формы
    const textSkeletons = screen.getAllByTestId(/text-skeleton-\d+/);
    expect(textSkeletons).toHaveLength(5);

    for (let i = 0; i < 4; i++) {
      expect(textSkeletons[i]).toHaveStyle({ height: '56px' });
    }

    expect(textSkeletons[4]).toHaveStyle({ height: '100px' });
  });
});
