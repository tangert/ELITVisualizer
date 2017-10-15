import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './Toggle.css'

const defaultProps = {
  enabled: true,
  className: ''
};

class Toggle extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const {enabled, onClick} = this.props;

    if(enabled)
      onClick();
  };

  render() {
    const className = ['switch', this.props.className, (this.props.on ? 'on ' : ''), (this.props.enabled ? '' : 'disabled ')].join(' ');
    return (
      <div className={className} onClick={this.handleClick} style = {{width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor }}>
        <div className="switch-toggle" children = {this.props.children}></div>
      </div>
    );
  }
}

Toggle.defaultProps = defaultProps;

export default Toggle;
