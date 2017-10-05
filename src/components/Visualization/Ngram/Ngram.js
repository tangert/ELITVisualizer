import React, { Component } from 'react';
import './Ngram.css';

class Ngram extends Component {
  constructor(props){
    super(props);

    this.state = {
      isClicked: false,
      isHovered: false,
    };

    console.log("CONSTRUCTED");
  }

  renderColor = (weight) => {

    let color = {
      r: weight[0]*255,
      g: weight[1]*255,
      b: weight[2]*255
    };

    return color;
  }


  handle_mouse_enter = (e) => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  handle_mouse_leave = (e) => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  handle_on_click = (e) => {
    console.log("click");
    if(this.props.is_on) {
      this.setState({
        isClicked: !this.state.isClicked
      });
    }
  }

  render () {
    //renders the style based on whether or not it's actually activated.
    let content_style;
    let container_style;
    let opacity;

    if(this.props.visible) {
      opacity = 1;
    } else {
      opacity = 0.1;
    }

    let color = this.renderColor(this.props.sentenceSentiment);
    // console.log(baseColor);
    let scaleFactor = this.props.weight;
    let heightRatio = 100;

    let baseColor = "rgba(" +
    Math.round(color.r) + "," +
    Math.round(color.g) + "," +
    Math.round(color.b) +",";

    if (!this.props.visualFocus.scale && !this.props.visualFocus.opacity) {

      content_style = {
        backgroundColor: "white",
        color: baseColor + "1)",
        margin: "2.5px",
        fontSize: "1.5em",
        transition: "0.2s"
      };
    }

    container_style = {
      transition: "0.2s",
      height: "auto",
      width: "auto",
      opacity: opacity
    };

    if (this.props.visualFocus.opacity) {
      content_style = {
        backgroundColor: "white",
        color: baseColor + (this.props.weight) + ")",
        margin: "2.5px",
        fontSize: "1.5em",
        transition: "0.2s"
      };
    }

    if (this.props.visualFocus.scale){
      container_style = {
        transition: "0.2s",
        backgroundColor: baseColor + (this.props.visualFocus.opacity ? this.props.weight : "1)"),
        height: scaleFactor*heightRatio,
        width: scaleFactor*heightRatio,
        borderRadius: "50%",

        marginLeft: "5px",
        marginRight: "5px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: opacity
      };

      content_style = {
        fontSize: scaleFactor + "em",
        color: "white",
        backgroundColor: "transparent",
        transition: "0.2s ease-in",
      };

    }

    return(
      <div className = "n_gram-container" style = {container_style}>
            <div
              className = {"ngram-content" + (this.state.isClicked ? " clicked" : "")}
              onClick = {this.handle_on_click}
              style = {content_style}
              >
              {this.props.token}
            </div>
      </div>
    );
  }
}

export default Ngram;
