import React from 'react'
import PropTypes from "prop-types";


class BookViewList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf_title: PropTypes.string.isRequired,
        onChangeHandler: PropTypes.func.isRequired
    };

    render() {
        const { books, shelf_title, onChangeHandler } = this.props;
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf_title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={ book.id }>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128,
                                            height: 188,
                                            backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                                        }}/>
                                        <div className="book-shelf-changer">
                                            <select
                                                defaultValue="move"
                                                onChange={(e) => onChangeHandler(e, book)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="delete">Delete</option>
                                            </select>
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

export default BookViewList