import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './domain/reducers';
import Header from './components/Header';
import HighlightJs from './components/highlight-js';
import { PostView } from './views/post';
import HomeView from './views/home';
import { configureStore } from '@reduxjs/toolkit';
import initialState from './posts';

const store = configureStore({
  reducer,
  preloadedState: initialState as any,
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <HighlightJs />
          <Header />
          <Routes>
            <Route path="/post/:slug" element={<PostView />} />
            <Route path="/" element={<HomeView />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  ReactDOM.render(<App />, target);
});
