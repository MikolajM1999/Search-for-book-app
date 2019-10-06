import React from 'react'

const BookListItem = ({ bookImageLink, bookFullTitle, bookShortDescription, publishedDate, bookCanonicalVolumeLink }) => (
   <div>
      <a href={bookCanonicalVolumeLink} target="_blank" rel="noopener noreferrer search">
         <img src={bookImageLink} alt={bookFullTitle} width="128" height="194" />
      </a>
      <p>{publishedDate}</p>
      <h3>{bookFullTitle}</h3>
      <p>{bookShortDescription}</p>
   </div>
)

export default BookListItem