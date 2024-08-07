import { render, screen } from '@testing-library/react';
import AuthorDetailsSkeleton from '../components/AuthorDetailsSkeleton';
import { describe, test, expect } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Вспомогательная функция для обёртки компонента необходимыми провайдерами
const renderWithProviders = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AuthorDetailsSkeleton Component', () => {
  test('отрисовывает компонент с элементами скелетной загрузки', () => {
    renderWithProviders(<AuthorDetailsSkeleton />);

    // Проверяем отрисовку главного контейнера
    const skeletonContainer = screen.getByTestId('author-details-skeleton');
    expect(skeletonContainer).toBeInTheDocument();

    // Проверяем наличие прямоугольного скелета для изображения
    const imageSkeleton = screen.getByTestId('image-skeleton');
    expect(imageSkeleton).toBeInTheDocument();
    expect(imageSkeleton).toHaveStyle({ width: '150px', height: '200px' });

    // Проверяем наличие скелета для имени автора
    const nameSkeleton = screen.getByTestId('name-skeleton');
    expect(nameSkeleton).toHaveStyle({ width: '10rem' });

    // Проверяем наличие скелета для имени автора
    const bornSkeleton = screen.getByTestId('born-skeleton');
    expect(bornSkeleton).toHaveStyle({ width: '4rem' });

    // Проверяем наличие текстовых скелетов для основного текста
    const textSkeletons = screen.getAllByTestId(/text-skeleton-\d+/);
    expect(textSkeletons).toHaveLength(5);
  });
});
