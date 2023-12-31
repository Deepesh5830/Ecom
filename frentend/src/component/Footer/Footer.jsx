import React from "react";
import playStore from '../../images/playstore.png';
import appStore from '../../images/appstore.webp';
import './Footer.css'
const Footer = () =>{

    return(
      <footer id="footer">
        <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt = 'playstore' />
        <img src={appStore} alt = 'appstore' />
        </div>

        <div className ="midFooter">
        <h1>COMMERCE</h1>
        <p>High Quality is Our first priority</p>
        <p>Copyright 2021 $copy; MeDeepeshKumar</p>
        </div>

        <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram </a>
        <a href="">Youtube </a>
        <a href="">Facebook </a>
        </div>
      </footer>
    )

}
export default Footer;
