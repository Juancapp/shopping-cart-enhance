/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";
import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="contact">
        <div>
          <span>Subscribe to our newsletter</span>
          <div className="inputContainer">
            <input type="text" />
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
          <LinkedinLogo color="white" size={40} weight="fill" />
          <TwitterLogo color="white" size={40} weight="fill" />
          <FacebookLogo color="white" size={40} weight="fill" />
          <InstagramLogo color="white" size={40} weight="fill" />
          <YoutubeLogo color="white" size={40} weight="fill" />
        </div>
      </div>
      <span className="copyright">
        © 2023 Cocoa | All rights reserved | See Terms and Conditions| View Privacy Policy | Contact: info@cocoamarket.com
      </span>
    </div>
  );
};
