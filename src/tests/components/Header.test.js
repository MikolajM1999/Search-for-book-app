import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'

test('Header renders without crashing', () => {
   shallow(<Header />)
})

test('should render Header correctly', () => {
   const wrapper = shallow(<Header />)
   expect(wrapper).toMatchSnapshot()
})