import prepareTheDescription from './prepareTheDescription'

const renderBooks = async (response, that) => {
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
      const bookId = book.id

      const aBook = { bookImageLink, bookFullTitle, bookShortDescription, bookId }

      that.setState(() => ({ searchingBooks: [...that.state.searchingBooks, aBook] }))
   })
}

export default renderBooks