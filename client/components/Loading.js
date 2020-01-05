import React, {PureComponent} from "react";

export default class Loading extends PureComponent {
  render() {
    return (
      <div className="Loading">
        {this.props.children}
      </div>
    );
  }
}
