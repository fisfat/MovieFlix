import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './components/Home'
import Movie from './components/Movie'







class App extends Component {

  constructor(){
    super()
    this.state = {
      query: ''
    }
  }
 
  getQuery = query =>{
   this.setState({
     query: query
   })
   console.log(this.state.query)
  }

  componentDidMount(){
    
  }
  render() {
    
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:movie_id" component={Movie} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
