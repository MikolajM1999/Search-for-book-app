import moment from 'moment'

export default (that) => {
   const now = moment().valueOf()

   if ((now - that.state.lastSubmition) >= 1000) {
      that.setState(() => ({ lastSubmition: now }))
      console.log('allowed to submit the form')
      return true
   } else {
      return false
   }
}