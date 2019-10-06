import prepareTheDescription from './prepareTheDescription'

export default async (response, that) => {
   const data = await response.json()

   that.setState(() => ({ totalBooks: data.totalItems }))

   console.log(data)
   console.log(data.items)

   if (data.items === undefined) {
      const error = 'No such book found, please try again with different values, make sure that the fields are correctly spelled'
      that.setError(error)
      return new Error(error)
   }
   that.setError('')

   data.items.forEach((book) => {
      const bookImageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail : '../img/unknown_book.png'
      const bookFullTitle = book.volumeInfo.title || "The book doesn't have a title"
      const bookShortDescription = prepareTheDescription(book)
      const bookCanonicalVolumeLink = book.volumeInfo.canonicalVolumeLink ? book.volumeInfo.canonicalVolumeLink : 'https://www.google.com/'
      const publishedDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'unknown'
      const bookId = book.id

      const aBook = { bookImageLink, bookFullTitle, bookShortDescription, bookCanonicalVolumeLink, publishedDate, bookId }

      that.setState(() => ({ searchingBooks: [...that.state.searchingBooks, aBook] }))
   })
}