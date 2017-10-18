import React, { PropTypes } from 'react'
import './Header.css'
import logo from './../../static/logo.svg'

const Header = (props) => {
  return (
    <div className = "app-header">

      <a className = "elit-link" href = "https://elit.cloud/" target="_blank">
        <img style = {{width: "25px", height: "25px", marginRight: "10px"}} src={logo}/>
      </a>

      <div className = "app-header-title">ELIT Sentiment Visualization</div>
    </div>
  )
}

export default Header
