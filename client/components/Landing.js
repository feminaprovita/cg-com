import React from 'react'
import {withRouter} from 'react-router-dom'
import {
  Profile,
  Affiliation,
  // Blog,
  // Category,
  // Job,
  // Presentation,
  Project
  // Publication,
  // School,
  // Skill
} from './index'
import {
  dummyProjects,
  dummyAffiliations,
  dummyCategories
} from '../../scrap/hold'

const Landing = () => (
  <div id="landing-container">
    <Profile />
    <div id="component-tests">
      {/* <Category /> */}
      <Affiliation
        categories={dummyCategories}
        affiliations={dummyAffiliations}
      />
      {/* <Blog />
      <Job />
      <Presentation /> */}
      <Project categories={dummyCategories} projects={dummyProjects} />
      {/* <Publication />
      <School />
      <Skill /> */}
    </div>
  </div>
)

export default withRouter(Landing)
