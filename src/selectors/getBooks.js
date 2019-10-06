import moment from 'moment'
import renderBooks from './renderBooks'

const getBooks = async (that) => {
   let startIndex = 0

   if (navigator.onLine) {
      console.log(`User has internet connection? - ${navigator.onLine}`)

      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${that.state.typedTitle}+inauthor:${that.state.typedAuthor}&maxResults=12&langRestrict=${that.state.typedLanguage}&printType=books`)

      document.addEventListener('scroll', async () => {
         const heightOfThePage = Math.round(document.querySelector('html').offsetHeight)
         const pixelsFromTop = window.pageYOffset
         const pixelsOfUserWindow = window.innerHeight
         const now = moment().valueOf()
         that.setState(() => ({ pixelsFromTop }))

         if (heightOfThePage === (pixelsFromTop + pixelsOfUserWindow) && that.state.searchingBooks.length !== that.state.totalBooks && (now - that.state.lastSubmition) >= 1000) {
            startIndex = startIndex + 12
            console.log('user scrolled to the bottom')

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${that.state.typedTitle}+inauthor:${that.state.typedAuthor}&startIndex=${JSON.stringify(startIndex)}&maxResults=12&langRestrict=${that.state.typedLanguage}&printType=books`)

            renderBooks(response, that)
            that.setState(() => ({ lastSubmition: now }))
         }
      })

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

export default getBooks