const createHistory = require('history').createBrowserHistory
const createMemoryHistory = require('history').createMemoryHistory

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history

/*
Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.
Warning: Please use `require("history").createMemoryHistory` instead of `require("history/createMemoryHistory")`. Support for the latter will be removed in the next major release.
*/
