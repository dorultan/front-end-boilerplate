import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class Screen extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={`Screen Screen--${this.props.name}`}>
        {this.props.children}
      </div>
    );
  }
}
