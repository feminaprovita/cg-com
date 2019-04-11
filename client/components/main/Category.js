/* eslint-disable complexity */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import {
  Affiliation,
  Blog,
  Job,
  Presentation,
  Project,
  Publication,
  School,
  Skill
} from '../index'

class Category extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      allCategories: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/categories')
    let activeCat = []
    this.props.activeCategories.forEach(c => {
      data.forEach(ca => {
        if (c.id === ca.id) activeCat.push(ca)
      })
    })
    this.setState({
      categories: activeCat,
      allCategories: data
    })
  }

  handleClick = evt => {
    evt.preventDefault()
    evt.persist()
    const errorHandling = arr => {
      return arr.filter(el => Object.keys(el).length !== 0)
    }
    let thisCat = {}
    this.state.allCategories.forEach(c => {
      if (c.name === evt.target.innerHTML) {
        thisCat = {...c}
      }
    })
    let tester
    this.state.categories.forEach(oldCat => {
      if (oldCat.id === thisCat.id) {
        tester = true
      }
    })
    let updatedCats = [...this.state.categories]
    if (tester) {
      let outputCats = updatedCats.filter(c => c.id !== thisCat.id)
      this.setState({
        categories: errorHandling(outputCats)
      })
    } else {
      updatedCats = [...this.state.categories, thisCat]
      this.setState({
        categories: errorHandling(updatedCats)
      })
    }
  }

  render() {
    // let activeCategories = this.props.activeCategories
    // console.log('cat props', this.props)
    console.log('cat state categories', this.state.categories)
    let codeButtonColor = 'primary'
    let editorialButtonColor = 'primary'
    let theologyButtonColor = 'primary'
    let hobbiesButtonColor = 'primary'
    this.state.categories.forEach(c => {
      if (c.id === 1) {
        codeButtonColor =
          codeButtonColor === 'primary' ? 'secondary' : 'primary'
      }
      if (c.id === 2) {
        editorialButtonColor =
          editorialButtonColor === 'primary' ? 'secondary' : 'primary'
      }
      if (c.id === 3) {
        theologyButtonColor =
          theologyButtonColor === 'primary' ? 'secondary' : 'primary'
      }
      if (c.id === 4) {
        hobbiesButtonColor =
          hobbiesButtonColor === 'primary' ? 'secondary' : 'primary'
      }
    })

    return (
      <div id="testing">
        <div id="category-buttons">
          <Button
            id="code-button"
            className="cat-button"
            onClick={this.handleClick}
            variant="contained"
            color={codeButtonColor}
          >
            Code
          </Button>
          <Button
            id="editorial-button"
            className="cat-button"
            onClick={this.handleClick}
            variant="contained"
            color={editorialButtonColor}
          >
            Editorial
          </Button>
          <Button
            id="theology-button"
            className="cat-button"
            onClick={this.handleClick}
            variant="contained"
            color={theologyButtonColor}
          >
            Theology
          </Button>
          <Button
            id="hobbies-button"
            className="cat-button"
            onClick={this.handleClick}
            variant="contained"
            color={hobbiesButtonColor}
          >
            Hobbies
          </Button>
        </div>
        <div id="moved-components">
          <Project categories={this.props.activeCategories} />
          {/* <Blog categories={this.props.activeCategories} /> */}
          {/* <Presentation categories={this.props.activeCategories} /> */}
          {/* <Publication categories={this.props.activeCategories} /> */}
          {/* <School categories={this.props.activeCategories} /> */}
          {/* <Job categories={this.props.activeCategories} /> */}
          {/* <Affiliation categories={this.props.activeCategories} /> */}
          {/* <Skill categories={this.props.activeCategories} /> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Category)
