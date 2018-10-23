import React, { Component } from 'react'
/**
 * Routes:
 *   - ./src/routes/PrivateRoute.js
 */
class BasicLayout extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default BasicLayout;
