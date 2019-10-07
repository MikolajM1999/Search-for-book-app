import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import * as serviceWorker from './serviceWorker'
import Dashboard from './components/Dashboard'
require('./selectors/eventForArrow')

ReactDOM.render(<Dashboard />, document.getElementById('root'))

serviceWorker.unregister()