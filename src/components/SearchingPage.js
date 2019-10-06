import React from 'react'
import BookList from './BookList'
import getBooks from '../selectors/getBooks'
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
   render() {
      return (
         <div>
            <form onSubmit={this.onSubmit}>
               <input placeholder="Title" name="title" required />
               <input placeholder="Author" name="author" />
               <input placeholder="(EN,FR,PL,...)" name="language" />
               <button>Search</button>
            </form>
            {this.state.error && <p>{this.state.error}</p>}
            <BookList searchingBooks={this.state.searchingBooks} />
         </div>
      )
   }
}