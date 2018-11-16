import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import PostView from './views/post';

class App extends React.Component {
  render() {
    return (
      <PostView />
    );
  }
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  ReactDOM.render(<App />, target);
});
