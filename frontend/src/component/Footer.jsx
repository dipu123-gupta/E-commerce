import React from "react";
import "../componentStyles/Footer.css";
import {
  Phone,
  Mail,
  GitHub,
  LinkedIn,
  Instagram,
  Facebook,
  YouTube,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer sections1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone />
            Phone: 123-456-789
          </p>
          <p>
            <Mail />
            Email: 1tZmM@example.com
          </p>
          <p>
            <LocationOnIcon />
            Address: 123 Main Street, City, Country
          </p>
        </div>
        {/* Footer sections2 */}
        <div className="footer-section social">
          <h3>Follow me</h3>
          <div className="social-links">
            <a href="#" target="_blank">
              <GitHub className="social-icon" />
            </a>
            <a href="#" target="_blank">
              <LinkedIn className="social-icon" />
            </a>
            <a href="#" target="_blank">
              <Instagram className="social-icon" />
            </a>
            <a href="#" target="_blank">
              <Facebook className="social-icon" />
            </a>
            <a href="#" target="_blank">
              <YouTube className="social-icon" />
            </a>
          </div>
        </div>
        {/* Footer sections3 */}
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
