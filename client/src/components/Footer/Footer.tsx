import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="banner-footer">
      <div className="author-btn">
        <Link to="/author">À propos</Link>
      </div>
      <p>&copy; Jinloup Ludo Art 2025</p>
      <figure className="grid-figure">
        <a href="https://github.com/G-Ludovic" target="blank">
          <img src="/images/github-mark.svg" alt="logo GitHub" />
        </a>
        <a
          href="https://linkedin.com/in/ludovic-galicher-69ba9932a"
          target="blank"
        >
          <img src="/images/linkedin.webp" alt="logo Linkedin" />
        </a>
      </figure>
    </footer>
  );
}

export default Footer;
