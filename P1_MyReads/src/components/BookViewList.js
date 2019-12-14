import React from 'react'
import PropTypes from "prop-types";
import BookView from "./BookView";


class BookViewList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf_title: PropTypes.string.isRequired
    };

    render() {
        const { books, shelf_title } = this.props;
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf_title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={ book.title }>
                                <BookView
                                    img_url = { "url(" + book.imageLinks.thumbnail + ")" }
                                    title = { book.title }
                                    authors = { book.authors }
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookViewList