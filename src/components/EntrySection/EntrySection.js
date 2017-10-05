import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import './EntrySection.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EntrySection extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    }
  }

  editText = (e) => {
    this.props.actions.editText(e.target.value);
  }

  analyzeText = () => {
    if(this.props.currentText !== "") {
      this.props.actions.analyzeText(this.props.currentText);
    } else {
      console.log("need text");
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      acceptedFiles
    });

    const reader = new FileReader();

    reader.onload = () => {
        JSON.parse(reader.result, (err, data) => {
            console.log(data);
        });
    };

    reader.readAsText(acceptedFiles[0]);
    //send over to new redux action to analyze directly.
  }

  render() {

    /*
    <Dropzone style = {{
      height: "50px",
      color: "rgba(0,0,0,0.25)",
      borderColor: "rgba(0,0,0,0.1)",
      borderWidth: "2px",
      borderStyle: "dotted",
      flex: 1,
      marginRight: "20px",
      borderRadius: "10px",
      padding: "10px",
      }}onDrop={this.onDrop}>
        Drop a file here
    </Dropzone>
    */
    
    return(
      <div className = "entry-section-container"
        >
        <div className = "entry">
          <textarea
            value = {this.props.currentText}
            onChange = {this.editText}
            onFocus = {this.handleEntryFocus}
            className = "entry-textarea"
            placeholder = "Enter any text to analyze its sentiment.">
          </textarea>

          <button onClick = {this.analyzeText} className = "analyze-text-btn">Analyze</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    analyzedText: state.EntrySection.analyzedText,
    currentText: state.EntrySection.currentText,
    currentNgram: state.ControlPanel.currentNgram,
    phraseData: state.EntrySection.phrase
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(EntrySection)
