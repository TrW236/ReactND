import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookViewCard from './components/BookViewCard'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <BookViewCard />
        )}/>
      </div>
    )
  }
}

export default BooksApp
