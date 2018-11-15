import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  static render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('app');
  // render app
  if (target) {
    ReactDOM.render(<App />, target);
  } else {
    console.warn('tried to load React and failed :(');
  }
});
