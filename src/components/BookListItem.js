import React from 'react'

const BookListItem = ({ bookImageLink, bookFullTitle, bookShortDescription, publishedDate, bookCanonicalVolumeLink }) => (
   <div className="book container-for-books__book-item">
      <a className="book__image-link" href={bookCanonicalVolumeLink} target="_blank" rel="noopener noreferrer search">
         <img src={bookImageLink} alt={bookFullTitle} width="128" height="194" />
      </a>
      <div className="div-info book__right-side-info">
         <p className="div-info__item book__published-date">{publishedDate}</p>
         <h3 className="div-info__item book__full-title">{bookFullTitle}</h3>
         <p className="div-info__item book__short-description">{bookShortDescription}</p>
      </div>
   </div>
)

export default BookListItem