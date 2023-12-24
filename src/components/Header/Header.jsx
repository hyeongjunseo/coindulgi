import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../store";

import "../../styles/global.scss";
import "./Header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => {
    return state.stats.data;
  });
  console.log(stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header-stats">
        <div className="stats-item">
          <div className="stats-image">
            <img
              className="stats-image-btc"
              src="/bitcoin.webp"
              alt="bitcoin"
            />
          </div>
          <div className="stats-title">BTC Market Cap</div>
          <div className="stats-value">{stats.marketCap}</div>
        </div>
        <div className="stats-item">
          <div className="stats-title">Volume</div>
          <div className="stats-value">{stats.volume}</div>
        </div>
        <div className="stats-item">
          <div className="stats-title">Dominance</div>
          <div className="stats-value">{stats.dominance}%</div>
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
    </header>
  );
}
