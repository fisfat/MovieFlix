import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'


import axios from 'axios';
class Usage extends Component{
   constructor(){
       super()
      this.state = {
        keyword: '',
        movies: [ ],
        page: 1,
        total_pages: 0
    }
    
    let key = '9abb06545efd48e40e6c416930822c98'
    this.api_url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`
   }
    
    
    handleSearch = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    
    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({page: pageNumber});
      }
    
     
    
    componentDidMount(){
        console.log(this.api_url) 
        axios.get(this.api_url)
        .then(res=>{
            this.setState({
                movies: res.data.results,
                //movies_count: res.data.total_results,
                page: res.data.page,
                total_pages: res.data.total_pages
            })
        })
        console.log(this.api_url)
        
    }
    
    
    
    render(){
    
       const { movies } = this.state
       const { page } = this.state
       let img = 'https://image.tmdb.org/t/p/w500'
       
       const movieList = movies.length ? (
            movies.map(movie =>{
            if(movie.backdrop_path !== null && movie.backdrop_path !==''){
                return(
                    <div className="col xl4" key={movie.id}>
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator" alt="Movie backdrop" src={img + movie.backdrop_path} />
                            </div>
                                <div className="card-content">
                                <h6 id="card-title" className="card-title activator grey-text text-darken-4"><Link to={'/' + movie.id}>{movie.title}</Link><i className="material-icons right">more_vert</i></h6>
                                <p>Vote: {movie.vote_average} </p>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Movie Overview<i className="material-icons right">close</i></span>
                                <p className="">{movie.overview}</p>
                                </div>
                        </div>
                    </div>
               
                 
                )
            }
            })
       ) : (
           <div className="center red-text">No movies</div>
       ) 
    
        const paginate = page.length ? (
            
            <div>
                <Pagination
                    activePage={this.state.page}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    />
            </div>
            
        ) : (
            <div>
             <Pagination
                    activePage={this.state.page}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    />
            </div>
        )
        return(
            <div>
                <div className="row">
                    <div className="col s12 grey darken-3">
                        <div className="center container edit">
                            <div className="center">
                                <h4 className="white-text">Search for: {this.state.keyword}</h4>
                            </div>
                            <form>
                                <label htmlFor="">Enter Keyword</label>
                                <input type="text" onChange={this.handleSearch} className="white-text center" name="" id=""/>
                                <button className="btn waves-effect grey darken-2 waves-light" type="submit" name="action">SEARCH</button>
                            </form>
    
    
                        </div>
                    </div>
                </div>
                    <div className="center">
                        <h2 className="grey-text">TRENDING </h2>
                    </div>
                    <div className="row container">
                        {movieList}
                        {paginate}
                    </div>
    
                
            </div>
        )
       
    }
}
export default Usage;