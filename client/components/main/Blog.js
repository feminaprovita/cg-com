import React, {Component} from 'react'
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
    let currentBlogs = data.filter(b => this.props.categories[b.categoryId])
    this.setState({blogs: currentBlogs})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/blogs')
      let currentBlogs = data.filter(b => this.props.categories[b.categoryId])
      this.setState({blogs: currentBlogs})
    }
  }

  render() {
    this.state.blogs.forEach(b => {
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
        {this.state.blogs.length > 0 ? (
          <div id="blog-component">
            <h2>Blog Posts</h2>
            {this.state.blogs.map(b => {
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
