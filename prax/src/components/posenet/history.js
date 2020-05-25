import createHistory from './node_modules/history/createBrowserHistory'
import createMemoryHistory from './node_modules/history/createMemoryHistory'

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history