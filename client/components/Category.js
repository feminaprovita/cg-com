import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllCategories, receiveOneCategory} from '../store'
import Button from '@material-ui/core/Button'

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories,
      currentCategories: this.props.currentCategories || ['code']
    }
  }
  handleClick(evt) {
    evt.preventDefault()
    console.log(evt.target)
    this.setState(prevState => {
      let copyCat = [prevState.categories]
      if (prevState.categories.includes(evt.target.value)) {
        const idxToDelete = prevState.categories.indexOf(evt.target.value)
        copyCat.splice(idxToDelete, 1)
        return {categories: copyCat}
      } else return {categories: [...copyCat, evt.target.value]}
    })
  }
  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    return (
      <div id="category-component">
        <Button
          id="code"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Code
        </Button>
        <Button
          id="editorial"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Editorial
        </Button>
        <Button
          id="theology"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Theology
        </Button>
        <Button
          id="hobbies"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Hobbies
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({categories: state.categories})

const mapDispatchToProps = dispatch => ({
  receiveAllCategories: category => dispatch(receiveAllCategories(category)),
  receiveOneCategory: categoryId => dispatch(receiveOneCategory(categoryId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
)
