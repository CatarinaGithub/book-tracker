import React, { useState } from 'react';
import './App.css';

// Defining types
interface Book {
  id: number;
  title: string;
  author: string;
  isRead: boolean;
  category: string;
}

type Category = 'all' | 'read' | 'unread';

function App() {
  // State to store the book list

  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", isRead: true },
    { id: 2, title: "Brief History of Time", author: "Stephen Hawking", category: "Science", isRead: false },
    { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self-help", isRead: false },
    { id: 4, title: "Don Quixote", author: "Miguel de Cervantes", isRead: false, category: "Classic" },
    { id: 5, title: "1984", author: "George Orwell", isRead: false, category: "Science Fiction" },
    { id: 6, title: "The Little Prince", author: "Antoine de Saint-Exupéry", isRead: true, category: "Children" }
  
]);


// State to store current filter category
const [filterCategory, setFilterCategory] = useState<Category>('all');
  
// ID for the next book to be added
const [nextId, setNextId] = useState(4);

// Function to add a new book
const addBook = (title: string, author: string, category: string) => {
  const newBook: Book = {
    id: nextId,
    title,
    author,
    isRead: false,
    category
  };
  
  setBooks([...books, newBook]); // Correto: usar 'books' em vez de 'initialBooks'
  setNextId(nextId + 1);
};

// Function to toggle reading status
const toggleReadStatus = (id: number) => {
  setBooks(books.map(book => 
    book.id === id ? { ...book, read: !book.isRead } : book
  ));
};

// Function to delete a book
const deleteBook = (id: number) => {
  setBooks(books.filter(book => book.id !== id));
};

// Function to change the filter
const changeFilter = (category: Category) => {
  setFilterCategory(category);
};

// Function to get filtered books
const getFilteredBooks = () => {
  switch (filterCategory) {
    case 'read':
      return books.filter(book => book.isRead);
    case 'unread':
      return books.filter(book => !book.isRead);
    default:
      return books;
  }
};

  // Get the current filtered books
  const filteredBooks = getFilteredBooks();

return (
  <div className="App">
    <header className="App-header">
      <h1>Book Manager</h1>
      
      <div className="filter-buttons">
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('read')}>Read</button>
        <button onClick={() => changeFilter('unread')}>Unread</button>
      </div>
      
      <div className="book-stats">
        <p>Total books: {filteredBooks.length}</p>
      </div>

      <div className="book-list">
        <h2>{filterCategory === 'all' ? 'All Books' : 
             filterCategory === 'read' ? 'Read Books' : 'Unread Books'}</h2>
        
        {filteredBooks.length > 0 ? (
          <ul>
            {filteredBooks.map(book => (
              <li key={book.id} className={book.isRead ? 'read' : 'unread'}>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Category: {book.category}</p>
                  <p>Status: {book.isRead ? 'Read' : 'Unread'}</p>
                </div>
                <div className="book-actions">
                  <button onClick={() => toggleReadStatus(book.id)}>
                    Mark as {book.isRead ? 'Unread' : 'Read'}
                  </button>
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found in this category.</p>
        )}
      </div>
    </header>
  </div>
);
}

export default App;
