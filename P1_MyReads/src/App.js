import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookViewList from './components/BookViewList'
import { Route, Link } from 'react-router-dom'
import SearchView from "./components/SearchView";
import {NotificationContainer, NotificationManager} from 'react-notifications';


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
        this.changeShelf = this.changeShelf.bind(this);
        this.add2shelf = this.add2shelf.bind(this);
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

    add2shelf(e, book) {
        // const shelf = e.target.value;
        const want2read_books = this.state.want2read_books;
        book.shelf = "w";
        want2read_books.push(book);
        this.setState(prevState =>(
            {
                current_reading_books: prevState.current_reading_books,
                want2read_books: want2read_books,
                read_books: prevState.read_books
            }
        ));
        NotificationManager.success('successfully added into "want to read" shelf', book.title);
    }

    changeShelf(e, book) {
        // e.preventDefault();
        const new_shelf = e.target.value;
        let { current_reading_books, want2read_books, read_books} = this.state;

        switch (book.shelf[0]) {
            case "c":
                current_reading_books = current_reading_books.filter(
                    element => element.title !== book.title);
                break;
            case "w":
                want2read_books = want2read_books.filter(
                    element => element.title !== book.title);
                break;
            case "r":
                read_books = read_books.filter(
                    element => element.title !== book.title);
                break;
            default:
        }

        switch (new_shelf[0]) {
            case "c":
                book.shelf = "c";
                current_reading_books.push(book);
                break;
            case "w":
                book.shelf = "w";
                want2read_books.push(book);
                break;
            case "r":
                book.shelf = "r";
                read_books.push(book);
                break;
            default:
        }

        this.setState({current_reading_books, want2read_books, read_books});
    }

    render() {
        return (
          <div className="app">
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <div className="list-books-content">
                        {shelf_titles.map((shelf_t) =>(
                            <BookViewList
                                key = { shelf_t }
                                books= { this.getBooksFromCategory(shelf_t) }
                                shelf_title = { shelf_t }
                                onChangeHandler={ this.changeShelf }
                            />
                        ))}
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button >Add a book</button>
                        </Link>
                    </div>
                </div>
            )}/>

            <Route exact path='/search' render={()=>(
                <SearchView
                    onChangeHandler={ this.add2shelf }
                />
            )}/>
            <NotificationContainer/>
          </div>
        )
    }
}

export default BooksApp
