import React, { Component } from 'react'
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import VirtualizedSelect from 'react-virtualized-select'
import { MdChevronRight, MdChevronLeft } from 'react-icons/lib/md';
import styles from './DocSentenceFilter.css';
import 'rc-slider/assets/index.css';

const style = { width: 400, marginBottom: 25, marginTop: 25 };
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class DocSentenceFilter extends Component {

  createDocumentOptions = (documents) => {
    let options = [];

    if(documents !== undefined) {
      for(var i = 0; i < documents.length; i++) {
        let newOption = {};
        newOption.value = i;
        newOption.label = "" + (i+1) + "";
        options.push(newOption);
      }

      return options;
    }
  }

  renderOptions = ({ key, option, style}) => {

    return (
      <div
        key = {key}
        onClick = {()=> this.selectDocument(option.value)}
        style={style}
        className = "document-option"
        >

        <label>
          {option.label}
        </label>

      </div>
    )
  }

  renderSentenceMarks = (currentDocument) => {
      var max = currentDocument.length;
      let mid = Math.ceil(max/2);
      console.log("MAX:",max);

      let marks = {};

      // for(var i = 0; i < max; i++) {
      //   marks[i] = i+1;
      // }

      marks[0] = 1;
      marks[mid-1] = mid;
      marks[max-1] = max;

      return marks;
  }

  onSentenceFilterChange = (value) => {
    this.props.filterSentences(value);
  }

  selectDocument = (val) => {
    console.log("SELECTED DOC VALUE: ", val);
    this.props.selectDocument(val);
  }

  selectDocumentArrow = (dir, selectedDocument) => {

    let next = selectedDocument;

    if(dir === "LEFT" && selectedDocument > 0) {
        next = selectedDocument-1;
        this.props.selectDocument(next);
    } else if (dir === "RIGHT" && selectedDocument < this.props.documents.length-1) {
        next = selectedDocument+1;
        this.props.selectDocument(next);
    }
  }

  render () {

    let sentenceMax;
    let documentSelector;
    let sentenceFilter;
    let containerStyle;

    let currentDocument = this.props.documents[this.props.selectedDocument];

    if(currentDocument !== undefined) {

      sentenceMax = currentDocument.length;

      let DOCUMENT_CHECK = this.props.documents.length > 1;
      let SENTENCE_CHECK = currentDocument.length > 4;

      //eventually add search functionality and more custom styles.

      if(DOCUMENT_CHECK) {
        documentSelector = (
          <div className = "doc-traversal">
            <div className = "control-panel-title">Document selector</div>
              <div style = {{display: "flex", flexDirection: "row", marginTop: "5 px"}}>
                <MdChevronLeft className = "chevron" onClick = {()=> this.selectDocumentArrow("LEFT", this.props.selectedDocument)}/>

                <VirtualizedSelect

                  className = "virtualized-select"

                  autofocus
                  clearable={false}
                  disabled={false}

                  labelKey='label'
                  valueKey='value'

                  multi={false}
                  onChange ={(option) => this.selectDocument(option.value)}
                  options={this.createDocumentOptions(this.props.documents)}
                  optionRenderer={this.renderOptions}
                  searchable={false}
                  value={this.props.selectedDocument}
                />

                <MdChevronRight className = "chevron" onClick = {()=> this.selectDocumentArrow("RIGHT", this.props.selectedDocument)}/>
              </div>
          </div>
        )
      }

      if(SENTENCE_CHECK) {
        sentenceFilter = (
          <div className = "sentence-filter">
            <div className = "control-panel-title">Sentence selector</div>
              <Slider.Range
              style = {{fontFamily: "Maven Pro", width: "200px"}}
              min={0}
              max = {currentDocument.length-1}
              marks={this.renderSentenceMarks(currentDocument)}
              onChange={this.onSentenceFilterChange}
              step = {1}
              />
          </div>
        );
      }

      //When both conditions aren't met.

      if(!DOCUMENT_CHECK && !SENTENCE_CHECK) {
        containerStyle = {
          display: "none"
        };
      } else {
        containerStyle = this.props.style;
      }
    }



    return(
      <div className = "control-panel-item-container"
        style = {containerStyle}
        >

        {documentSelector}
        {sentenceFilter}

      </div>
    )
  }
}

export default DocSentenceFilter;
