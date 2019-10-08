import React from 'react'
import { shallow } from 'enzyme'
import BookListItem from '../../components/BookListItem'

test('BookListItem renders without crashing', () => {
   shallow(<BookListItem />)
})

test('should render BookListItem correctly', () => {
   const wrapper = shallow(<BookListItem />)
   expect(wrapper).toMatchSnapshot()
})