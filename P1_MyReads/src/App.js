import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookViewList from './components/BookViewList'
import { Route } from 'react-router-dom'

const shelf_titles = [
    "currently reading", "want to read", "read"
];

function isCurrentlyReading(book) {
    return book.shelf[0] === "c";
}

function isWant2Read(book) {
    return book.shelf[0] === "w";
}

function isRead(book) {
    return book.shelf[0] === "r";
}

function classifyBooks(books) {
    const current_reading_books = books.filter(isCurrentlyReading);
    const want2read_books = books.filter(isWant2Read);
    const read_books = books.filter(isRead);
    return {
        current_reading_books,
        want2read_books,
        read_books
    }
}


class BooksApp extends React.Component {
    state = {
        current_reading_books: [],
        want2read_books: [],
        read_books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(classifyBooks(books));
        });
    }

    getBooksFromCategory(shelf_title) {
        let books;
        switch (shelf_title[0]) {
            case "c":
                books = this.state.current_reading_books;
                break;
            case "w":
                books = this.state.want2read_books;
                break;
            case "r":
                books = this.state.read_books;
                break;
            default:
                books = []
        }
        return books;
    }

    render() {
        return (
          <div className="app">
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <div>
                        {shelf_titles.map((shelf_t) =>(
                            <BookViewList
                                key = { shelf_t }
                                books= { this.getBooksFromCategory(shelf_t) }
                                shelf_title = { shelf_t }
                            />
                        ))}
                    </div>
                </div>
            )}/>
          </div>
        )
    }
}

export default BooksApp
