import React from 'react'
import BookListItem from './BookListItem'

const BookList = (props) => (
   <div className="container-for-books">
      {props.searchingBooks.length === 0 ? (
         <div className="info">
            <span className="info__message">Search for your book, fill at least title field</span>
         </div>
      ) : (
            props.searchingBooks.map((book) => {
               return <BookListItem key={book.bookId} {...book} />
            })
         )}
   </div>
)

export default BookList