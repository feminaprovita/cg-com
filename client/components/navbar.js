import React from 'react'

const Navbar = () => (
  <nav id="navbar">
    <span id="nav-name">
      <p>CLAIRE GILLIGAN</p>
    </span>
    <p>
      Click a button to{' '}
      <span id="pink-add">
        <b>add</b>
      </span>{' '}
      or{' '}
      <span id="blue-remove">
        <b>remove</b>
      </span>{' '}
      the relevant content from the page below
    </p>
  </nav>
)

export default Navbar
