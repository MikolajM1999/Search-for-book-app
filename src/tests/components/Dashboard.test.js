import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from '../../components/Dashboard'

test('Dashboard renders without crashing', () => {
   shallow(<Dashboard />)
})

test('should render Dashboard correctly', () => {
   const wrapper = shallow(<Dashboard />)
   expect(wrapper).toMatchSnapshot()
})