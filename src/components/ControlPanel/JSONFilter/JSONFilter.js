import React, { PropTypes } from 'react'
import Toggle from './../../common/Toggle/Toggle'
import './JSONFilter.css'

class JSONFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      switched: false
    };
  }

  toggle = () => {
    this.setState({
      switched: !this.state.switched
    }, () => {
      this.props.filterJSON(this.state.switched);
    });
  }

  render () {
    return(
      <div className = "json-filter-container">
        <div className = "control-panel-title">JSON Filter</div>
        <Toggle on = {this.state.switched} onClick = {this.toggle}/>
      </div>
    );
  }
}

export default JSONFilter;
