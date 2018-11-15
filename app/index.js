import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  ReactDOM.render(<App />, target);
});
