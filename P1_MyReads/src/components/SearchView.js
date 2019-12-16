import React from 'react';
import {withRouter} from 'react-router-dom'
import * as BooksAPI from "../BooksAPI";
import PropTypes from 'prop-types';
import 'react-notifications/lib/notifications.css';


class SearchView extends React.Component{
    state = {
        query: '',
        books: []
    };

    static propTypes = {
        onChangeHandler: PropTypes.func.isRequired
    };

    async updateQuery(new_query) {
        let books;
        if (new_query === '') {
            books = [];
        } else {
            books = await BooksAPI.search(new_query);
            // if the query is empty
            if (typeof books.length === 'undefined') {
                books=[];
            }
        }

        this.setState(prevState => (
                {
                    query: new_query,
                    books: books
                }
            )
        );
    }

    render(){
        const { onChangeHandler } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={
                        () => {
                            this.props.history.push('/')
                        }}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={ book.id }>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128,
                                            height: 188,
                                            backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                                        }}/>
                                        <div className="book-shelf-changer">
                                            <button onClick={(e) => onChangeHandler(e, book)}>Add a book</button>
                                        </div>
                                    </div>
                                    <div className="book-title">{ book.title }</div>
                                    <div className="book-authors">{ book.authors }</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchView)
