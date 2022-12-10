import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    // Destructuring concept used here this.props mese title aur description nikaal liya kheech ke
    let {title,description,imageUrl,url} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
       
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a rel='noreferrer' href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
