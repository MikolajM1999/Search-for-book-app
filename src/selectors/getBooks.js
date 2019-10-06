import renderBooks from './renderBooks'

export default async (that) => {
   if (navigator.onLine) {
      console.log(`User has internet connection? - ${navigator.onLine}`)

      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${that.state.typedTitle}+inauthor:${that.state.typedAuthor}&maxResults=12&langRestrict=${that.state.typedLanguage}&printType=books`)

      if (response.status === 200) {
         renderBooks(response, that)
      } else {
         const error = 'Unable to get the books'
         that.setError(error)
         return new Error(error)
      }

   } else if (!navigator.onLine) {
      const error = 'You need an internet connection to use the app'
      that.setError(error)
      return new Error(error)
   } else {
      const error = 'Something went wrong!'
      that.setError(error)
      return new Error(error)
   }
}