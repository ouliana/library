import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import Authors from '../components/Authors';
import { useAllAuthorsQuery } from '../hooks/queries';
import { useErrorDispatch } from '../hooks/useError';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Мокируем хуки
vi.mock('../hooks/queries');
vi.mock('../hooks/useError');
vi.mock('../hooks/useError');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const theme = createTheme();

// Вспомогательная функция для обёртки компонента необходимыми провайдерами
const renderWithProviders = component => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>{component}</Router>
    </ThemeProvider>
  );
};

describe('Authors Component', () => {
  const mockErrorDispatch = vi.fn();

  beforeEach(() => {
    // Переустанавливаем реализацию мока перед каждым тестом
    useErrorDispatch.mockReturnValue(mockErrorDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('отрисовывает скелеты во время загрузки', () => {
    useAllAuthorsQuery.mockReturnValue({
      authors: null,
      loading: true,
      error: null
    });

    renderWithProviders(<Authors />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('');
    expect(screen.getAllByRole('cell')).toHaveLength(27); // 9 скелетов строк по 3 ячейки
  });

  test('отрисовывает данные автора после загрузки', async () => {
    useAllAuthorsQuery.mockReturnValue({
      authors: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          born: '1980',
          bookCount: 5
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          born: '1990',
          bookCount: 3
        }
      ],
      loading: false,
      error: null
    });

    renderWithProviders(<Authors />);

    // Проверяем, что информация об авторах выведена в таблице
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1980')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('корректно обрабатывает клик по строке таблицы', async () => {
    useAllAuthorsQuery.mockReturnValue({
      authors: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          born: '1980',
          bookCount: 5
        }
      ],
      loading: false,
      error: null
    });

    renderWithProviders(<Authors />);

    // const row = await screen.findByText('John Doe');
    // fireEvent.click(row.closest('tr')); // Клик на строке таблицы

    const row = await screen.findByText('John Doe');
    const tableRow = row.closest('tr');
    if (!tableRow) {
      throw new Error('Table row not found');
    }

    // Simulate click on the table row
    fireEvent.click(tableRow);

    expect(mockNavigate).toHaveBeenCalledWith('/authors/1');
  });

  test('отправляет ошибку при возникновении ошибки', () => {
    const errorMessage = 'Невозможно загрузить авторов.';
    useAllAuthorsQuery.mockReturnValue({
      authors: null,
      loading: false,
      error: errorMessage
    });

    renderWithProviders(<Authors />);

    expect(mockErrorDispatch).toHaveBeenCalledWith({
      type: 'SET',
      payload: errorMessage
    });
  });
});
