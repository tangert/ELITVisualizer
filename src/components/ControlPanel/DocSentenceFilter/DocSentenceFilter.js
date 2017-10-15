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
      console.log("MAX:",max);

      let marks = {};
      for(var i = 0; i < max; i++) {
        marks[i] = i+1;
      }

      console.log("MARKS:",marks);
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

    let currentDocument = this.props.documents[this.props.selectedDocument];

    if(currentDocument !== undefined) {

      sentenceMax = currentDocument.length;

      //eventually add search functionality and more custom styles.

      if(this.props.documents.length > 1) {
        documentSelector = (
          <div className = "doc-traversal">
            <div className = "control-panel-title">Document selector</div>
              <div style = {{display: "flex", flexDirection: "row"}}>
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

      if(currentDocument.length > 1) {
        sentenceFilter = (
          <div className = "sentence-filter">
            <div className = "control-panel-title">Sentence selector</div>
              <Slider.Range
              style = {{fontFamily: "Maven Pro", width: "25vw"}}
              min={0}
              max = {currentDocument.length-1}
              marks={this.renderSentenceMarks(currentDocument)}
              onChange={this.onSentenceFilterChange}
              step = {1}
              />
          </div>
        );
      }
    }

    return(
      <div className = "doc-sentence-filter-container">
        {documentSelector}
        {sentenceFilter}
      </div>
    )
  }
}

export default DocSentenceFilter;
