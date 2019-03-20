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
      currentCategory: ''
    }
  }
  handleClick(evt) {
    evt.preventDefault()
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
    return (
      <div id="category-component">
        <Button variant="contained" color="primary">
          Category button test
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
