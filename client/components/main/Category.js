/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {toggleCategory} from '../../store'

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
  handleClick = async (catId, evt) => {
    evt.preventDefault()
    evt.persist()
    await this.props.toggleCategory(catId)
  }

  render() {
    console.log('category rendering')
    console.log('cat props', this.props)
    let codeButtonColor = this.props.categories[1] ? 'secondary' : 'primary'
    let editorialButtonColor = this.props.categories[2]
      ? 'secondary'
      : 'primary'
    let theologyButtonColor = this.props.categories[3] ? 'secondary' : 'primary'
    let hobbiesButtonColor = this.props.categories[4] ? 'secondary' : 'primary'

    return (
      <div id="components-holder">
        <div id="category-buttons">
          <Button
            id="code-button"
            className="cat-button"
            onClick={this.handleClick.bind(this, 1)}
            variant="contained"
            color={codeButtonColor}
          >
            Code
          </Button>
          <Button
            id="editorial-button"
            className="cat-button"
            onClick={this.handleClick.bind(this, 2)}
            variant="contained"
            color={editorialButtonColor}
          >
            Editorial
          </Button>
          <Button
            id="theology-button"
            className="cat-button"
            onClick={this.handleClick.bind(this, 3)}
            variant="contained"
            color={theologyButtonColor}
          >
            Theology
          </Button>
          <Button
            id="hobbies-button"
            className="cat-button"
            onClick={this.handleClick.bind(this, 4)}
            variant="contained"
            color={hobbiesButtonColor}
          >
            Hobbies
          </Button>
        </div>
        <div id="resume-components">
          <Project categories={this.props.categories} />
          <Blog categories={this.props.categories} />
          <Presentation categories={this.props.categories} />
          <Publication categories={this.props.categories} />
          <School categories={this.props.categories} />
          <Job categories={this.props.categories} />
          <Affiliation categories={this.props.categories} />
          <Skill categories={this.props.categories} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  toggleCategory: categoryId => dispatch(toggleCategory(categoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)
