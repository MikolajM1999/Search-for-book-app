import React from 'react'
import { shallow } from 'enzyme'
import BookList from '../../components/BookList'
import books from '../fixtures/books'

test('BookList renders without crashing with default array value', () => {
   shallow(<BookList searchingBooks={[]} />)
})

test('BookList renders without crashing with books', () => {
   shallow(<BookList searchingBooks={books} />)
})

test('should render BookList correctly with books', () => {
   const wrapper = shallow(<BookList searchingBooks={books} />)
   expect(wrapper).toMatchSnapshot()
})

test('should render BookList correctly with default empty array', () => {
   const wrapper = shallow(<BookList searchingBooks={[]} />)
   expect(wrapper).toMatchSnapshot()
})