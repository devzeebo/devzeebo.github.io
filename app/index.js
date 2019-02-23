import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import Header from './components/header';
import HighlightJs from './components/highlight-js';

import { PostView } from './views/post';
import HomeView from './views/home';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <>
            <HighlightJs />
            <Header />

            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route path="/post/:slug" exact component={PostView} />
            </Switch>
          </>
        </Router>
      </Provider>
    );
  }
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  ReactDOM.render(<App />, target);
});
