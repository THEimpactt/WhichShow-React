import React from 'react'
import logo from './main.png'

export default function TopNav() {
  return (
    <div>
            <nav className="navbar bg-body-tertiary">
        <div style={{backgroundColor:'#1F2937'}}  className="container">
            <a className="navbar-brand" href="/App.js">
            <img src={logo} width="100" alt='logo' height="50"/>
            </a>
        </div>
        </nav>
    </div>
  )
}
