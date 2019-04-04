import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Blog extends Component {
  constructor() {
    super()
    this.state = {
      blogs: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/blogs')
    this.setState({
      blogs: data
    })
  }

  render() {
    // console.log('blog props', this.props)
    // console.log('blog state', this.state)
    let blogs = []
    this.state.blogs.forEach(b => {
      b.slug = (b.title.match(/^.*(?=[\.,:;!?(–—])/g) || b.title)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      b.keyName = b.slug + '-component'
      b.imgAlt = b.slug + '-thumbnail-' + b.date
      if (this.props.categories.includes(b.categoryId)) {
        blogs.push(b)
      }
    })
    // console.log('blogs', blogs)

    return (
      <div id="blog-component">
        {blogs.length > 0 ? <h2>Blogs</h2> : <div id="no-blogs" />}
        {blogs.length > 0 ? (
          blogs.map(b => {
            return (
              <div className="one-blog" key={b.keyName}>
                <img
                  className="blog-thumbnail"
                  src={b.imageUrl}
                  alt={b.imgAlt}
                />
                <div className="blog-info">
                  <h4>{b.title}</h4>
                  {b.summary ? <p>{b.summary}</p> : <p>{b.teaser}</p>}
                  <p>
                    <a href={b.postUrl} target="blank">
                      Read more...
                    </a>
                  </p>
                  {/* <p>{b.date}</p> */}
                </div>
              </div>
            )
          })
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default withRouter(Blog)
