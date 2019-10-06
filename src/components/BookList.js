import React from 'react'
import BookListItem from './BookListItem'

const BookList = (props) => (
   <div>
      {props.searchingBooks.length === 0 ? (
         <div>
            <span>Search for your book, fill at least title field.</span>
         </div>
      ) : (
            props.searchingBooks.map((book) => {
               return <BookListItem key={book.bookId} {...book} />
            })
         )}
   </div>
)

export default BookList