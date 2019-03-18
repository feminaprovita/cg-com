import React from 'react'

const Profile = () => (
  <div id="profile-container">
    <div id="profile">
      <img
        id="profile-pic"
        src="/profile.png"
        alt="Claire Gilligan profile picture"
      />
    </div>
    <div id="profile-text">
      <p>Welcome to clairegilligan.com!</p>
      <p>
        You can find me on{' '}
        <a href="https://www.linkedin.com/in/claire-gilligan/" target="blank">
          LinkedIn
        </a>
        {', '}
        <a href="https://github.com/feminaprovita/" target="blank">
          Github
        </a>
        {', and '}
        <a href="https://medium.com/@feminaprovita" target="blank">
          Medium
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
        And you can email me at{' '}
        <a href="mailto:claire.gilligan.dev@gmail.com">
          claire.gilligan.dev@gmail.com
        </a>.
      </p>
      <p>
        Check back soon, because I will definitely be adding more stuff here as
        I go!
      </p>
    </div>
  </div>
)

export default Profile
