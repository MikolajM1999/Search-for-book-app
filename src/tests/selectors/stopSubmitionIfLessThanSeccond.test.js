import stopSubmitionIfLessThanSeccond from '../../selectors/stopSubmitionIfLessThanSeccond'
import moment from 'moment'

test('should return false if "(now - that.state.lastSubmition) < 1000"', () => {
   const that = { state: { lastSubmition: moment().valueOf() } }
   const boolean = stopSubmitionIfLessThanSeccond(that)
   expect(boolean).toBe(false)
})

test('should return true if "(now - that.state.lastSubmition) >= 1000"', () => {
   const that = {
      state: {
         lastSubmition: moment().subtract(10, 'seconds').valueOf()
      },
      setState: jest.fn()
   }
   const boolean = stopSubmitionIfLessThanSeccond(that)
   expect(boolean).toBe(true)
   expect(that.setState).toHaveBeenCalled()
})