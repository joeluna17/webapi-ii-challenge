import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import PostsContainer from './components/PostsContainer';


function App() {
  return (
      <div className="App">
      <Navigation />
      <Route exact path="/" component={LandingPage} />
      <Route path="/api/posts" component={PostsContainer} />

    </div>
  );
}

export default App;
