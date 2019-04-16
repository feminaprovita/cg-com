/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {receiveCategories, toggleCategory} from '../../store'

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
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      thisCategory: {}
    }
  }

  async componentDidMount() {
    // receiveCategories([1])
    const {data} = await axios.get('/api/categories')
    let activeCat = []
    let catIds = []
    this.props.activeCategories.forEach(c => {
      data.forEach(ca => {
        if (c.id === ca.id) {
          activeCat.push(ca)
          catIds.push(ca.id)
        }
      })
    })
    this.setState({
      categories: activeCat,
      categoryIds: catIds
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const latest = this.props.match.params.id
  //   const prev = prevProps.match.params.id

  //   if (latest !== prev) {
  //     // console.log('in didupdate')
  //     // this.props.fetchSingleDestination(latest)
  //   }
  // }

  handleClick = async evt => {
    evt.preventDefault()
    evt.persist()
    console.log('evt', evt)
    await this.props.toggleCategory(this.props.match.params.id)
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
          {/* <Project categories={this.props.activeCategories} /> */}
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

const mapStateToProps = state => ({
  categories: state.categories,
  thisCategory: state.thisCategory
})

const mapDispatchToProps = dispatch => ({
  receiveCurrentCategories: categories =>
    dispatch(receiveCurrentCategories(categories)),
  toggleCategory: categoryId => dispatch(toggleCategory(categoryId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
)
