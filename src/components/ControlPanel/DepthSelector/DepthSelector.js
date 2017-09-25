import React, { PropTypes } from 'react'
import './DepthSelector.css'

class DepthSelector extends React.Component {

  selectDepth = (bool) => {
    this.props.selectDepth(bool);
  }

  render () {
    return(
      <div className = "depth-selector-container">
        <div className = "control-panel-title">Depth mode</div>
        <div className = "depth-btns">
          <button onClick = {() => this.selectDepth(false)}
            className = {this.props.depthOn ? "control-panel-btn": "control-panel-btn nodepth-active"}>2D</button>
          <button onClick = {() => this.selectDepth(true)}
            className = {this.props.depthOn ? "control-panel-btn depth-active" : "control-panel-btn"}>3D</button>
        </div>
      </div>
    );
  }
}

export default DepthSelector;
