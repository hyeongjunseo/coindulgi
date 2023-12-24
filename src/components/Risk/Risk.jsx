import React, { useState } from "react";
import Header from "../Header/Header";

import "../../styles/global.scss";
import "./Risk.scss";
import PageHead from "../shared/PageHead";

export default function Risk() {
  const [tradingBalance, setTradingBalance] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entry, setEntry] = useState(14.9);
  const [stopLoss, setStopLoss] = useState(14.5);
  const [target, setTarget] = useState(17.2);

  const riskUSDT = (tradingBalance * riskPercent) / 100;
  const rrr = ((target - entry) / (entry - stopLoss)).toFixed(1);
  const invalidation = (entry - stopLoss) / entry;
  const positionSize = (
    (tradingBalance * riskPercent) /
    100 /
    invalidation
  ).toFixed(0);

  const [isCalculated, setIsCalculasted] = useState(false);

  return (
    <div className="page-container">
      <PageHead title="Effective Cryptocurrency Risk Management Strategies" />
      <Header />
      <form action="" className="calc-container">
        <div className="calc-row">
          <div className="calc-input">
            <label htmlFor="trading-balance">Trading Balance $</label>
            <input
              id="trading-balance"
              placeholder={tradingBalance}
              onChange={(e) => setTradingBalance(e.target.value)}
              type="number"
            />
          </div>
          <div className="calc-input">
            <label htmlFor="risk-percent">Risk %</label>
            <input
              id="risk-percent"
              placeholder={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              type="number"
            />
          </div>
          <div className="calc-input">
            <label htmlFor="riskUsdt">Risk USDT</label>
            <input id="riskUsdt" value={riskUSDT} type="number" />
          </div>
        </div>
        <div className="calc-row">
          <div className="calc-input">
            <label htmlFor="entry">E/P</label>
            <input
              id="entry"
              placeholder={entry}
              onChange={(e) => setEntry(e.target.value)}
              type="number"
            />
          </div>
          <div className="calc-input">
            <label htmlFor="stop-loss">S/L</label>
            <input
              id="stop-loss"
              placeholder={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              type="number"
            />
          </div>
          <div className="calc-input">
            <label htmlFor="target">T/P</label>
            <input
              id="target"
              placeholder={target}
              onChange={(e) => setTarget(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div>
          <button
            className="calc-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsCalculasted(true);
            }}
          >
            Calculate
          </button>
        </div>
        <div className="calc-row">
          <div className="calc-res">
            <span>RRR</span>
            <div className="RRR">{isCalculated ? rrr : "---"}</div>
          </div>
          <div className="calc-res">
            <span>Position Size</span>
            <div className="position-size">
              {isCalculated ? positionSize : "---"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
