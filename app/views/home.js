import React from 'react';
import { connect } from 'react-redux';
// import ReactMarkdown from 'react-markdown';

class HomeView extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.homePage}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  homePage: state.homePage,
});
export default connect(mapStateToProps)(HomeView);
