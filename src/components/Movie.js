import React, {Component } from 'react';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding: 10px;
`;

class Movie extends Component{
   
    state = {
        movies: [ ],
        loading: true,
    }
    componentDidMount(){
        let id = this.props.match.params.movie_id
        const key = '9abb06545efd48e40e6c416930822c98'
        const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
        axios.get(api_url)
        .then(res => {
            this.setState({
                movies: res.data,
                loading: false
            })
        })
    }
    
    render(){
        const {movies} = this.state
        let img = 'https://image.tmdb.org/t/p/original'
        const genres = movies.genres ? (
           movies.genres.map(genre => {
                    return(
                        <div key={genre.id}>
                            <ul>
                                <li>{genre.name}</li>
                            </ul>
                        </div>
                    )
                })
        ) : (
            <div>
                <p>None listed</p>
            </div>
        )
        const movie = this.state.movies ? (
            <div>
            <div className="container">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="" src={img + this.state.movies.backdrop_path}  alt="Backdrop path" />
                    </div>
                    <div className="card-content">
                        <span className="card-title center grey-text text-darken-4">{this.state.movies.title}</span>
                        <table className="">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Item Name</th>  
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>Title</td>
                                <td>{this.state.movies.title}</td>
                                
                            </tr>
                            <tr>
                                <td>Overview</td>
                                <td>{this.state.movies.overview}</td>
                                
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{this.state.movies.release_date} <em>Release status: {this.state.movies.status}</em></td>
                                
                            </tr>

                            <tr>
                                <td>Genre(s)</td>
                                <td>{genres} </td>
                                
                            </tr>
                            <tr>
                                <td>Popularity</td>
                                <td>{this.state.movies.popularity}</td>    
                            </tr>

                             <tr>
                                <td>Votes</td>
                                <td>{this.state.movies.vote_average}</td>    
                            </tr>

                            <tr>
                                <td>Official link </td>
                                <td> <a target="_blank" rel="noopener noreferrer" href={this.state.movies.homepage}>{this.state.movies.homepage} </a> </td>    
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    
                </div>
            </div>
            </div>
        ) : (
            <div>
                
            </div>
        )
        return(
            <div className="center" id="loader">
                <div className='sweet-loading center'>
                                <ClipLoader
                                className={override}
                                sizeUnit={"px"}
                                size={50}
                                color={'#424242'}
                                loading={this.state.loading}
                                />
                        </div>
            {movie}    
            </div>
        )
        
    }
}
export default Movie