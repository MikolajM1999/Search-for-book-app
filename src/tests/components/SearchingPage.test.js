import React from 'react'
import { shallow } from 'enzyme'
import SearchingPage from '../../components/SearchingPage'

test('SearchingPage renders without crashing', () => {
   shallow(<SearchingPage />)
})

test('should render SearchingPage correctly', () => {
   const wrapper = shallow(<SearchingPage />)
   expect(wrapper).toMatchSnapshot()
})

test('should render SearchingPage with correct state', () => {
   const state = {
      lastSubmition: 0,
      error: '',
      totalBooks: 0,
      startIndex: 0,
      typedTitle: '',
      typedAuthor: '',
      typedLanguage: '',
      searchingBooks: []
   }
   const wrapper = shallow(<SearchingPage />)
   expect(wrapper.state()).toEqual(state)
})

test('should correctly set Error to state on submit when typed language is incorrect', () => {
   const wrapper = shallow(<SearchingPage />)
   wrapper.find('.main__form').simulate('submit', {
      preventDefault: () => { },
      target: {
         elements: {
            title: {
               value: 'title'
            },
            author: {
               value: ''
            },
            language: {
               value: 'aaa'
            }
         }
      }
   })
   expect(wrapper.state('error').length).toBeGreaterThan(0)
   expect(wrapper).toMatchSnapshot()
})

test('should correctly set state on submit when typed values are correct', () => {
   const wrapper = shallow(<SearchingPage />)
   wrapper.find('.main__form').simulate('submit', {
      preventDefault: () => { },
      target: {
         elements: {
            title: {
               value: 'Gold  '
            },
            author: {
               value: '  Jon'
            },
            language: {
               value: '  eN'
            }
         }
      }
   })
   expect(wrapper.state('typedTitle')).toBe('gold')
   expect(wrapper.state('typedAuthor')).toBe('jon')
   expect(wrapper.state('typedLanguage')).toBe('en')
})