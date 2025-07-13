import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div>
      <footer style={{backgroundColor:'#111827', color:'#6B7280'}} className="footer">
      <div className="footer-content">

        <div className="footer-company">
          <h2>3rd impact Corp.</h2>
          <p>Building irrelevent stuff</p>
          <p>3rd impact Corp. All rights reserved.</p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email us at:</p>
          <a href="mailto:thethirdimpact.corp@gmail.com" style={{color:'#6B7280'}} className="email-link">thethirdimpact.corp@gmail.com</a>
        </div>

      </div>
    </footer>
    </div>
  )
}
