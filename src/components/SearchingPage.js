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
         typedTitle: '',
         typedAuthor: '',
         typedLanguage: '',
         searchingBooks: []
      }
   }
   componentDidMount() {
      let startIndex = 0
      document.addEventListener('scroll', async () => {
         const heightOfThePage = Math.round(document.querySelector('html').offsetHeight)
         const pixelsFromTop = window.pageYOffset
         const pixelsOfUserWindow = window.innerHeight
         const now = moment().valueOf()

         if (heightOfThePage === (pixelsFromTop + pixelsOfUserWindow) && this.state.searchingBooks.length !== this.state.totalBooks && (now - this.state.lastSubmition) >= 1000) {
            startIndex = startIndex + 12
            console.log('user scrolled to the bottom')

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.typedTitle}+inauthor:${this.state.typedAuthor}&startIndex=${JSON.stringify(startIndex)}&maxResults=12&langRestrict=${this.state.typedLanguage}&printType=books`)

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
         <div>
            <form onSubmit={this.onSubmit}>
               <input placeholder="Title" name="title" required autoComplete="off" />
               <input placeholder="Author" name="author" autoComplete="off" />
               <input placeholder="(EN,FR,PL,...)" name="language" autoComplete="off" />
               <button>Search</button>
            </form>
            {this.state.error && <p>{this.state.error}</p>}
            <button onClick={this.onArrowClick} id="arrow"><img src="/img/arrowUp.png" alt="arrow up" height="110" width="110" /></button>
            <BookList searchingBooks={this.state.searchingBooks} />
         </div>
      )
   }
}