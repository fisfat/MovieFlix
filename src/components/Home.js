import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import axios from 'axios';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Home extends Component{
    state = {
        keyword: '',
        movies: [ ],
        loading: true,
    }

    handleSearch = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9abb06545efd48e40e6c416930822c98&language=en-US&query=${this.state.keyword}&page=1&include_adult=false`)
        .then(res => {
            this.setState({
                movies: res.data.results,
                loading: false
            })
        })
    }


    componentDidMount(){
        const key = '9abb06545efd48e40e6c416930822c98'
        const api_url = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`
        axios.get(api_url)
        .then(res=>{
            this.setState({
                movies: res.data.results,
                movies_count: res.data.total_results,
                page: res.data.page,
                loading: false,
            })
        })  
    }

    render(){

       const { movies } = this.state
       let img = 'https://image.tmdb.org/t/p/w500'
       const movieList = movies.length ? (movies.map(movie =>{
           
                if(movie.backdrop_path !== null && movie.backdrop_path !==''){
                   
                    return(
                        <div className="col xl4" key={movie.id}>
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" alt="Movie backdrop" src={img + movie.backdrop_path} />
                                </div>
                                <div className="card-content">
                                    <h6 id="card-title" className="card-title activator grey-text text-darken-4"><Link to={'/' + movie.id}>&nbsp;{movie.title}</Link><i className="material-icons right">more_vert</i></h6>
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
                <div className="center">
                    <h5 className="grey-text darken-3">Movies are not loaded yet...</h5>
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
                            <form onSubmit={this.handleSubmit} >
                                <label htmlFor="">Enter Keyword</label>
                                <input type="text" onChange={this.handleSearch}  className="white-text center" name="" id=""/>
                                <button className="btn waves-effect grey darken-2 waves-light" type="submit" name="action">SEARCH</button>
                            </form>
                        </div>
                    </div>
                </div>
                    <div className="center">
                        <h2 className="grey-text">TRENDING </h2>
                    </div>
                    <div className="row container">
                        <div className='sweet-loading center' id="loader">
                                <ClipLoader
                                className={override}
                                sizeUnit={"px"}
                                size={50}
                                color={'#424242'}
                                loading={this.state.loading}
                                />
                        </div>
                            {movieList}
                    </div> 
            </div>
        )
       
    }
}

export default Home;