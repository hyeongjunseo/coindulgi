import React from "react";
import { Link } from "react-router-dom";

import "../../styles/global.scss";
import "./Header.scss";

export default function Header() {
  return (
    <div className="page-container">
      <div className="header">
        <nav className="header-nav">
          <ul className="nav-main">
            <li className="nav-item">
              <Link className="nav-logo-link" to="/">
                <img
                  className="nav-logo"
                  src="/dulgi.png"
                  alt="Coin Dulgi Logo"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="header-menu-item" to="/trend">
                TREND
              </Link>
            </li>
            <li className="nav-item">
              <Link className="header-menu-item" to="/event">
                EVENT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="header-menu-item" to="/news">
                NEWS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="header-menu-item" to="/risk">
                RISK 🤿 🌊
              </Link>
            </li>
          </ul>
          <ul className="nav-external">
            <li className="nav-item-external">
              <Link className="external-link" to="https://www.binance.com/en">
                <img
                  className="external-logo"
                  src="/binance.png"
                  alt="Binance logo"
                />
              </Link>
            </li>
            <li className="nav-item-external">
              <Link className="external-link" to="https://www.tradingview.com/">
                <svg
                  className="external-logo"
                  viewBox="0 0 36 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 22H7V11H0V4h14v18zM28 22h-8l7.5-18h8L28 22z"
                    fill="currentColor"
                  ></path>
                  <circle cx="20" cy="8" r="4" fill="currentColor"></circle>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
