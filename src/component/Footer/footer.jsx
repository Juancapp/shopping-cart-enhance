/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";
import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="contact">
        <div>
          <span>Subscribe to our newsletter</span>
          <div className="inputContainer">
            <input type="text" className="input" placeholder="Email..." />
            <button>Send</button>
          </div>
        </div>
        <div>
          <span>Need help?</span>
          <a href="#">FAQs and Contact</a>
        </div>
        <div>
          <span>About us</span>
          <a href="#">About Cocoa</a>
          <a href="#">Social Networks</a>
        </div>
        <div>
          <span>Payment Methods</span>
          <a href="#">Cocoa Payments</a>
          <a href="#">Pay with products or financing</a>
        </div>
      </div>
      <div className="socialMedia">
        <span>Follow us on our networks</span>
        <div>
          <a href="https://www.linkedin.com/in/jandrescappuccio/" target='blank'>
            <LinkedinLogo
              className="icon"
              color="white"
              size={37}
              weight="fill"
            />
          </a>
          <TwitterLogo className="icon" color="white" size={37} weight="fill" />
          <FacebookLogo
            className="icon"
            color="white"
            size={37}
            weight="fill"
          />
          <InstagramLogo
            className="icon"
            color="white"
            size={37}
            weight="fill"
          />
          <YoutubeLogo className="icon" color="white" size={37} weight="fill" />
        </div>
      </div>
      <span className="copyright">
        © 2023 Cocoa | All rights reserved |{" "}
        <a href="">See Terms and Conditions</a> |{" "}
        <a href="">View Privacy Policy</a> | Contact: info@cocoamarket.com
      </span>
    </div>
  );
};
