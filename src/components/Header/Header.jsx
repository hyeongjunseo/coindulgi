import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../store";

import "../../styles/global.scss";
import "./Header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector((state) => state.stats);

  // Check if data is loading or there is an error
  const shouldShowPlaceholder = isLoading || error;

  const {
    coins = "---",
    exchanges = "---",
    marketCap = "---",
    marketCap_percentage = "---",
    volume = "---",
    dominance_btc = "---",
    dominance_eth = "---",
  } = shouldShowPlaceholder ? {} : data;

  const formatNumber = (num) => {
    if (typeof num !== "number") {
      return "---";
    }
    if (num >= 1e12) {
      return (num / 1e12).toFixed(3) + "T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(3) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(3) + "M";
    } else {
      return num.toFixed(3);
    }
  };

  const getPercentageStyle = (percentage) => {
    if (typeof percentage !== "number") {
      return { color: "#6088ff" };
    }
    if (percentage >= 0) {
      return { color: "#22AB94" };
    } else {
      return { color: "#F23545" };
    }
  };

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header-stats">
        <div className="stats-item">
          <span className="stats-label">Coins:</span>
          <span className="stats-value">{coins}</span>
        </div>
        <div className="stats-item">
          Exchanges:
          <span className="stats-value">{exchanges}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Market Cap:</span>
          <span className="stats-value">${formatNumber(marketCap)}</span>
          <span
            className="stats-value-percentage"
            style={getPercentageStyle(marketCap_percentage)}
          >
            {marketCap_percentage >= 0
              ? `+${marketCap_percentage}`
              : `${marketCap_percentage}`}
            %
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">24h Vol:</span>
          <span className="stats-value">${formatNumber(volume)}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Dominance:</span>
          <span className="stats-label">BTC</span>
          <span className="stats-value">{dominance_btc}%</span>
          &nbsp;
          <span className="stats-label">ETH</span>
          <span className="stats-value">{dominance_eth}%</span>
        </div>
      </div>
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
            <Link
              className="external-link"
              to="https://www.binance.com/en"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className="external-logo"
                src="/binance.png"
                alt="Binance logo"
              />
            </Link>
          </li>
          <li className="nav-item-external">
            <Link
              className="external-link"
              to="https://www.tradingview.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
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
    </header>
  );
}
