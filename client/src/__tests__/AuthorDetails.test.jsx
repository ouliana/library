// AuthorDetails.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import AuthorDetails from '../components/AuthorDetails';
import { useTokenValue } from '../hooks/useToken';
import { useAuthorByIdQuery } from '../hooks/queries';
import { useErrorDispatch } from '../hooks/useError';

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();

// Мокируем хуки
vi.mock('../hooks/useToken');
vi.mock('../hooks/queries');
vi.mock('../hooks/useError');

vi.mock('../components/BooksByAuthor', () => {
  return {
    default: () => <div data-testid='books-by-author'>Books by Author Stub</div>
  };
});

// Вспомогательная функция для обёртки компонента необходимыми провайдерами
const renderWithRouter = component => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>{component}</Router>
    </ThemeProvider>
  );
};

describe('AuthorDetails Component', () => {
  const mockErrorDispatch = vi.fn();

  beforeEach(() => {
    // Сбрасываем реализацию моков перед каждым тестом
    useTokenValue.mockReturnValue(null);
    useAuthorByIdQuery.mockReturnValue({
      author: null,
      loading: true,
      error: null
    });
    useErrorDispatch.mockReturnValue(mockErrorDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('отрисовывает скелетную загрузку', () => {
    renderWithRouter(<AuthorDetails />);

    expect(screen.getByTestId('author-details-skeleton')).toBeInTheDocument();
  });

  test('отрисовывает информацию об авторе, если она получена', async () => {
    useAuthorByIdQuery.mockReturnValue({
      author: {
        firstName: 'John',
        lastName: 'Doe',
        born: '1990',
        annotation: 'An acclaimed author.',
        profile: '/path/to/profile.jpg'
      },
      loading: false,
      error: null
    });

    renderWithRouter(<AuthorDetails />);

    // Проверяем отрисовку всей информации об авторе
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('1990')).toBeInTheDocument();
      expect(screen.getByText('An acclaimed author.')).toBeInTheDocument();
    });

    const profileImage = screen.getByRole('img');
    expect(profileImage).toHaveStyle(
      'background-image: url(/path/to/profile.jpg)'
    );
  });

  test('отрисовывает кнопку "Редактировать" при наличии действующего токена', async () => {
    useTokenValue.mockReturnValue('some-token');
    useAuthorByIdQuery.mockReturnValue({
      author: {
        firstName: 'John',
        lastName: 'Doe',
        born: '1990',
        annotation: 'An acclaimed author.',
        profile: '/path/to/profile.jpg'
      },
      loading: false,
      error: null
    });

    renderWithRouter(<AuthorDetails />);

    // Проверяем, что кнопка "Редактировать" отображается
    const editButton = await screen.findByLabelText('Редактировать');
    expect(editButton).toBeInTheDocument();

    // Симулируем клик на кнопке
    fireEvent.click(editButton);

    // Проверяем, что происходит перенаправление на корректный маршрут
    expect(editButton.closest('a')).toHaveAttribute('href', '/edit');
  });

  test('отправляет ошибку при возникновении ошибки', () => {
    const errorMessage = 'Failed to load author details.';
    useAuthorByIdQuery.mockReturnValue({
      author: null,
      loading: false,
      error: errorMessage
    });

    renderWithRouter(<AuthorDetails />);

    // Проверяем, что действие ошибка отправлена при возникновении ошибки
    expect(mockErrorDispatch).toHaveBeenCalledWith({
      type: 'SET',
      payload: errorMessage
    });
  });
});
