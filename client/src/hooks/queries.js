import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOKS_BY_AUTHOR_ID,
  ALL_GENRES,
  AUTHOR_BY_ID,
  BOOK_BY_ID,
  GENRE
} from '../graphql/queries';

export const useAllAuthorsQuery = () => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors);
    }
  }, [data]);

  return { authors, loading, error };
};

export const useBooksByAuthorIdQuery = id => {
  const { loading, error, data } = useQuery(BOOKS_BY_AUTHOR_ID, {
    variables: { authorId: Number(id) }
  });
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (data) {
      setBooks(data.booksByAuthorId);
    }
  }, [data]);

  return { books, loading, error };
};

export const useAllBooksQuery = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  return { books, loading, error };
};

export const useAllBooksByGenresQuery = genres => {
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: {
      genres: genres.map(genre => Number(genre.id))
    },
    skip: !genres || genres.length === 0
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data && !loading && !error) {
      setBooks(data.allBooks);
    }
  }, [data, loading, error]);

  return { books, loading, error };
};

export const useAllGenresQuery = () => {
  const { data, loading, error } = useQuery(ALL_GENRES);

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (data && !loading && !error) {
      setGenres(data.allGenres);
    }
  }, [data, loading, error]);

  return { genres, loading, error };
};

export const useAuthorByIdQuery = id => {
  const { loading, error, data } = useQuery(AUTHOR_BY_ID, {
    variables: { id: Number(id) }
  });

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (data && !loading && !error) {
      setAuthor(data.authorById);
    }
  }, [data, loading, error]);

  return { author, loading, error };
};

export const useBookByIdQuery = id => {
  const { loading, error, data } = useQuery(BOOK_BY_ID, {
    variables: { id: Number(id) }
  });

  const [book, setBook] = useState(null);

  useEffect(() => {
    if (data) {
      setBook(data.bookById);
    }
  }, [data, loading, error]);

  return { book, loading, error };
};

export const useBooksByGenre = id => {
  const { loading, error, data } = useQuery(GENRE, {
    variables: { id: Number(id) }
  });

  const [name, setName] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data.genreWithBooks.books);
      setName(data.genreWithBooks.name);
    }
  }, [data, loading, error]);

  return { name, books, loading, error };
};
