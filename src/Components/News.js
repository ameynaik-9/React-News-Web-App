import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8
    }
    static propTypes = {
        country:PropTypes.string,
        pagesize:PropTypes.number
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        // it runs after the render has ran
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&apiKey=7294d4712c83432d8e9614506294b3ab&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&apiKey=7294d4712c83432d8e9614506294b3ab&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async () => {
        console.log("Next")
        if (!(this.state.page + 1 < Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&apiKey=7294d4712c83432d8e9614506294b3ab&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url)
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles:parsedData.articles,
                loading:false
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>News 24 Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.indianexpress.com/2022/08/Kohli-24.jpg"} url={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&rarr;Next</button>
                </div>
            </div>
        )
    }
}

export default News