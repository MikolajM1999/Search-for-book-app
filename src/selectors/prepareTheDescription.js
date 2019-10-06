export default (book) => {
   if (book.volumeInfo.description) {
      const bookDescriptionWords = book.volumeInfo.description.split(' ')

      if (bookDescriptionWords.length > 19) {
         const newArray = bookDescriptionWords.slice(0, 19)
         const customizedDescription = newArray.join(' ') + '...'
         return customizedDescription
      } else {
         return bookDescriptionWords.join(' ')
      }
   } else {
      return "The book doesn't have a description"
   }
}