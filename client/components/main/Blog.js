import React, {Component} from 'react'
import axios from 'axios'

class Blog extends Component {
  constructor() {
    super()
    this.state = {
      allBlogs: [],
      filteredBlogs: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/blogs')
    let currentBlogs = data.filter(b => this.props.categories[b.categoryId])
    this.setState({
      allBlogs: data,
      filteredBlogs: currentBlogs
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      let currentBlogs = prevState.allBlogs.filter(b => this.props.categories[b.categoryId])
      this.setState({filteredBlogs: currentBlogs})
    }
  }

  render() {
    this.state.allBlogs.forEach(b => {
      b.slug = (b.title.match(/^.*(?=[\.,:;!?(–—])/g) || b.title)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      b.keyName = b.slug + '-component'
      b.imgAlt = b.slug + '-thumbnail-' + b.date
    })
    console.log('Blog state', this.state)

    return (
      <div className="resume-component">
        {this.state.filteredBlogs.length > 0 ? (
          <div id="blog-component">
            <h1>Blog Posts</h1>
            {this.state.filteredBlogs.map(b => {
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
                    <p><a href={b.postUrl} target="blank">
                        Read more...</a></p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <span id="no-blogs" />
        )}
      </div>
    )
  }
}

export default Blog
