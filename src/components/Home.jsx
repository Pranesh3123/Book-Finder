import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Userimg from "./images/userimag.jpg";

function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=10');
        const data = await response.json();
        if (data.works && data.works.length > 0) {
          setBooks(data.works);
        } else {
          setError('No books found.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultBooks();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim() === '') return;

    setLoading(true);
    setError('');

    const encodedQuery = encodeURIComponent(query);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodedQuery}&limit=10`);
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs);
      } else {
        setBooks([]);
        setError('No books found for your query.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="max-w-7xl mx-auto p-4 sm:p-6 min-h-screen" 
      style={{
        background: 'linear-gradient(135deg, #f0f8ff, #e6e6fa, #fdfd96)', /* Soft gradient background */
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* User Profile Section */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src={Userimg} alt="User" className="w-10 h-10 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">Welcome Alex</span>
        </div>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="p-3 w-full max-w-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mb-6">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="text-center text-red-500 text-lg mb-6">{error}</div>
      )}

      {/* Display Book Cards */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => navigate(`/book${book.key}`)}
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <h3 className="text-base font-semibold text-gray-800 mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{book.authors ? book.authors[0].name : 'Unknown Author'}</p>
              <p className="text-xs text-gray-500">{book.first_publish_year ? `First Published: ${book.first_publish_year}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* No Books Found Message */}
      {!loading && books.length === 0 && query && !error && (
        <div className="text-center text-gray-500 text-lg">
          No books found for "<span className="font-semibold text-gray-800">{query}</span>"
        </div>
      )}
    </div>
  );
}

export default Home;
