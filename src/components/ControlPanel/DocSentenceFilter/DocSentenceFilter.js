import React, { Component } from 'react'
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { MdChevronRight, MdChevronLeft } from 'react-icons/lib/md';
import './DocSentenceFilter.css';
import 'rc-slider/assets/index.css';

const style = { width: 400, marginBottom: 25, marginTop: 25 };
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class DocSentenceFilter extends Component {

  renderSentenceMarks = (data) => {
    var max = data.length-1;
    let marks = {};
    let mid = Math.floor((max)/2);

    marks[0] = "Sentence 1";
    marks[mid] = "Sentence " + mid;
    marks[max] = "Sentence " + max;

    console.log(marks);
    return marks;
  }

  onSentenceFilterChange = (value) => {
    console.log(value);
    this.props.filterSentences(value);
  }

  selectDocument = (direction) => {
    if(direction === 1) {
      this.props.selectDocument(1);
    } else {
      this.props.selectDocument(2);
    }
  }

  render () {

    let documentSelector;
    let sentenceFilter;
    //tipFormatter={value => `${this.props.phraseData[value].tokens.join(' ')}`}
    
    if(this.props.documentData.length > 1) {
      documentSelector = (
        <div className = "doc-traversal">
          <MdChevronLeft className = "doc-traversal-arrow" onClick = {()=> this.selectDocument(1)}/>
            <span style ={{userSelect: "none"}}>Document</span> <span className = "current-document">{ this.props.currentDocument  }</span>
          <MdChevronRight className = "doc-traversal-arrow"  onClick = {()=> this.selectDocument(2)}/>
        </div>
      )
    }

    if(this.props.phraseData.length > 10) {
      sentenceFilter = (
        <div className = "sentence-filter">
          <div style={style}>
            <Slider.Range
            style = {{fontFamily: "Maven Pro"}}
            min={0}
            max = {this.props.phraseData.length-1}
            marks={this.renderSentenceMarks(this.props.phraseData)}
            onChange={this.onSentenceFilterChange}
            defaultValue={[0, this.props.phraseData.length-1]}
            step = {1}
            />
          </div>
        </div>
      );
    }
    return(
      <div>
        {documentSelector}
        {sentenceFilter}
      </div>
    )
  }
}

export default DocSentenceFilter;
