import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import axios from 'axios'

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
        if (c === ca.id) activeCat.push(ca)
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
    let thisCat = {}
    this.state.allCategories.forEach(c => {
      if (c.name === evt.target.innerHTML) {
        thisCat = {...c}
      }
    })
    let tester
    this.setState(prevState => {
      prevState.categories.forEach(oldCat => {
        if (oldCat.id === thisCat.id) {
          tester = true
        }
      })
      let updatedCats = [...prevState.categories]
      if (tester) {
        updatedCats = updatedCats.filter(c => c.id !== thisCat.id)
        this.setState({
          categories: updatedCats
        })
      } else {
        updatedCats = [...prevState.categories, thisCat]
        this.setState({
          categories: updatedCats
        })
      }
    })
  }

  render() {
    // let activeCategories = this.props.activeCategories
    // console.log('cat props', this.props)
    console.log('cat state', this.state)
    return (
      <div id="category-component">
        <Button
          id="code-button"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Code
        </Button>
        <Button
          id="editorial-button"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Editorial
        </Button>
        <Button
          id="theology-button"
          onClick={this.handleClick}
          variant="contained"
          color="primary"
        >
          Theology
        </Button>
        <Button
          id="hobbies-button"
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

export default withRouter(Category)
