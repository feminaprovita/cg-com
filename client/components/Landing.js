import React from 'react'
import {connect} from 'react-redux'

const Landing = () => (
  <div id="landing-container">
    <div id="profile">
      <img
        id="profile-pic"
        src="/profile.png"
        alt="Claire Gilligan profile picture"
      />
    </div>
    <div id="landing-text">
      <p>Welcome to clairegilligan.com!</p>
      <p>
        You can find me on{' '}
        <a href="https://www.linkedin.com/in/claire-gilligan/" target="blank">
          LinkedIn
        </a>{' '}
        and{' '}
        <a href="https://github.com/feminaprovita/" target="blank">
          Github
        </a>,<br />
        or, if you're feeling informal, on{' '}
        <a href="https://www.facebook.com/feminaprovita/" target="blank">
          Facebook
        </a>{' '}
        and{' '}
        <a href="https://twitter.com/feminaprovita/" target="blank">
          Twitter
        </a>.
      </p>
      <p>
        Check back soon, because I will definitely be adding more stuff here as
        I go!
      </p>
    </div>
  </div>
)

export default connect(Landing)
