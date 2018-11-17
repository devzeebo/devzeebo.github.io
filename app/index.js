import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import PostView from './views/post';
import HomeView from './views/home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: {},
    };
  }

  componentDidMount() {
    axios.get('posts/posts.json')
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/post/:slug" exact component={PostView} />
        </Switch>
      </Router>
    );
  }
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  ReactDOM.render(<App />, target);
});
