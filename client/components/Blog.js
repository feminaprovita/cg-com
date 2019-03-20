import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllBlogs, receiveOneBlog} from '../store'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      blogs: []
    }
  }

  render() {
    return <div id="blog-component" />
  }
}

const mapStateToProps = state => ({blogs: state.blogs})

const mapDispatchToProps = dispatch => ({
  receiveAllBlogs: blog => dispatch(receiveAllBlogs(blog)),
  receiveOneBlog: blogId => dispatch(receiveOneBlog(blogId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
