import React, { Component } from 'react';
import './Ngram.css';

const red = {r: 212, g: 75, b: 60};
const blue = {r: 158, g: 222, b: 242};
const gray = {r: 112, g: 112, b: 112};

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
    if(weight < 0) {
      return this.convertPercentToColor(gray, red, Math.abs(weight));
    } else {
      return this.convertPercentToColor(gray, blue, weight);
    }
  }

  convertPercentToColor = (color1, color2, percent) => {
    var newColor = {};

    function makeChannel(a, b) {
        return(a + Math.round((b-a)*(percent)));
    }

    function makeColorPiece(num) {
        num = Math.min(num, 255);   // not more than 255
        num = Math.max(num, 0);     // not less than 0
        var str = num.toString(16);
        if (str.length < 2) {
            str = "0" + str;
        }
        return(str);
    }

    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);
    newColor.cssColor = "#" +
                        makeColorPiece(newColor.r) +
                        makeColorPiece(newColor.g) +
                        makeColorPiece(newColor.b);

    return(newColor);
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

    content_style = {
      backgroundColor: "white",
      color: this.renderColor(this.props.weight).cssColor,
      margin: "2.5px",
      transition: "0.2s"
    };

    let ratio = this.props.ratio;
    let heightRatio = 100;

    if (this.props.depthOn){

      container_style = {
        transition: "0.2s",

        backgroundColor: this.renderColor(this.props.weight).cssColor,
        height: ratio*heightRatio,
        width: ratio*heightRatio,
        borderRadius: "50%",
        marginLeft: "5px",
        marginRight: "5px",

        transform: this.props.transform,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: opacity
      };

      content_style = {
        fontSize: ratio + "em",
        color: "white",
        backgroundColor: "transparent",
        transition: "0.2s ease-in",
        opacity: opacity
      };

    } else {
      container_style = {
        transition: "0.2s",
        height: "auto",
        width: "auto",
        opacity: opacity
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
