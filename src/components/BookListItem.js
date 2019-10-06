import React from 'react'

const BookListItem = ({ bookImageLink, bookFullTitle, bookShortDescription }) => (
   <div>
      <img src={bookImageLink} alt={bookFullTitle} width="128" height="194" />
      <h2>{bookFullTitle}</h2>
      <p>{bookShortDescription}</p>
   </div>
)

export default BookListItem