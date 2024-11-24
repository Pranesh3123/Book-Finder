import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Userimg from "./images/userimag.jpg";

function BookDetails() {
  const { id } = useParams(); // Get the book key from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError("An error occurred while fetching the book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="text-lg text-blue-600 hover:text-blue-800 flex items-center space-x-2 transition-colors duration-300"
        >
          <span>&#8592;</span> {/* Back arrow symbol */}
          <span>Back to Home</span>
        </Link>

        {/* Profile Section */}
        <header className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-300">
          <img
            src={Userimg}
            alt="User Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-semibold text-gray-800">Alex</span>
        </header>
      </div>

      {/* Main Content */}
      {book && (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Book Image */}
            <div className="flex justify-center items-start mb-6">
              {book.covers && book.covers.length > 0 && (
                <div className="bg-gradient-to-b from-white to-blue-200 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                    alt={book.title}
                    className="rounded-lg w-full h-auto shadow-xl transition-all hover:scale-105"
                  />
                </div>
              )}
            </div>

            {/* Right Side: Book Details */}
            <div>
              <h1 className="text-5xl font-bold text-indigo-900 mb-4">{book.title}</h1>

              <div className="text-lg text-gray-700 mb-4">
                <span className="font-semibold text-indigo-800">Author(s): </span>
                {book.authors?.map((author, index) => (
                  <span key={index} className="text-indigo-600 hover:underline">
                    {author.author?.key
                      ? author.author.key.split("/")[2]
                      : "Unknown Author"}
                    {index < book.authors.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <div className="text-md text-gray-600 mb-6">
                <span className="font-semibold text-blue-600">First Published: </span>
                {book.first_publish_date}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Description</h3>
                <p className="text-lg text-gray-600">{book.description || "No description available."}</p>
              </div>

              {book.subjects && book.subjects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Subjects</h3>
                  <ul className="list-disc pl-6 text-lg text-gray-600">
                    {book.subjects.map((subject, index) => (
                      <li key={index}>{subject}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* External Links */}
              {book.links && book.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Useful Links</h3>
                  <ul className="mt-2 space-y-2 text-blue-600 text-lg">
                    {book.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excerpt */}
              {book.excerpts && book.excerpts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Excerpt</h3>
                  <p className="text-lg italic text-gray-600">"{book.excerpts[0].excerpt}"</p>
                </div>
              )}

              {/* Subject Places */}
              {book.subject_places && book.subject_places.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Subject Places</h3>
                  <ul className="list-disc pl-6 text-lg text-gray-600">
                    {book.subject_places.map((place, index) => (
                      <li key={index}>{place}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dewey Number */}
              {book.dewey_number && book.dewey_number.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Dewey Number</h3>
                  <p className="text-lg text-gray-600">{book.dewey_number.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
