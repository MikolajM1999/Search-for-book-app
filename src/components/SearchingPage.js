import React from 'react'
import moment from 'moment'
import BookList from './BookList'
import getBooks from '../selectors/getBooks'
import renderBooks from '../selectors/renderBooks'
import stopSubmitionIfLessThanSeccond from '../selectors/stopSubmitionIfLessThanSeccond'

export default class SearchingPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         lastSubmition: 0,
         error: '',
         totalBooks: 0,
         startIndex: 0,
         typedTitle: '',
         typedAuthor: '',
         typedLanguage: '',
         searchingBooks: []
      }
   }
   componentDidMount() {
      document.addEventListener('scroll', async () => {
         const heightOfThePage = Math.round(document.querySelector('html').offsetHeight)
         const pixelsFromTop = window.pageYOffset
         const pixelsOfUserWindow = window.innerHeight
         const now = moment().valueOf()

         if (heightOfThePage === (pixelsFromTop + pixelsOfUserWindow) && this.state.searchingBooks.length !== this.state.totalBooks && (now - this.state.lastSubmition) >= 1000) {
            this.setState((prevState) => ({ startIndex: prevState.startIndex + 20 }))
            console.log('user scrolled to the bottom')

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.typedTitle}+inauthor:${this.state.typedAuthor}&startIndex=${JSON.stringify(this.state.startIndex)}&maxResults=20&langRestrict=${this.state.typedLanguage}&printType=books`)

            renderBooks(response, this)
            this.setState(() => ({ lastSubmition: now }))
         }
      })
   }
   setError = (error) => {
      this.setState(() => ({ error }))
   }
   onSubmit = (e) => {
      e.preventDefault()

      const boolean = stopSubmitionIfLessThanSeccond(this)
      if (!boolean) {
         return boolean
      }

      this.setState(() => ({ startIndex: 0 }))

      const typedTitle = e.target.elements.title.value.trim().toLowerCase()
      const typedAuthor = e.target.elements.author.value.trim().toLowerCase()
      const typedLanguage = e.target.elements.language.value.trim().toLowerCase()

      const obj = { typedTitle, typedAuthor, typedLanguage, searchingBooks: [] }

      if (typedLanguage) {
         if (typedLanguage.match(/^[a-z]{2}$/)) {
            this.setState(() => (obj))
            setTimeout(() => { getBooks(this) }, 0)
         } else {
            const error = 'Enter only two letters in the language selection field or leave it empty'
            this.setError(error)
            return new Error(error)
         }
      } else {
         this.setState(() => (obj))
         setTimeout(() => { getBooks(this) }, 0)
      }
   }
   onArrowClick = () => {
      window.scrollTo(0, 0)
   }
   render() {
      return (
         <main className="main page__main">
            <form className="form main__form" onSubmit={this.onSubmit}>
               <input className="form__input" placeholder="title of a book" name="title" required autoComplete="off" />
               <input className="form__input" placeholder="author of a book" name="author" autoComplete="off" />
               <input className="form__input" placeholder="choose language - en,fr,pl,..." name="language" autoComplete="off" />
               <button className="button form__button">Search</button>
            </form>
            {this.state.error && <p className="main__error">{this.state.error}</p>}
            <button className="arrow-up-button" onClick={this.onArrowClick}><img className="arrow-up-button__image" src="/img/arrowUp.jpg" alt="arrow up" height="80" width="80" /></button>
            <BookList searchingBooks={this.state.searchingBooks} />
         </main>
      )
   }
}