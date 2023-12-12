import React, { useState } from "react";
import Header from "../components/Header";

export default function Risk() {
  const [tradingBalance, setTradingBalance] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entry, setEntry] = useState(14.9);
  const [stopLoss, setStopLoss] = useState(14.5);
  const [target, setTarget] = useState(17.2);

  const riskUSDT = (tradingBalance * riskPercent) / 100;
  const rrr = (target - entry) / (entry - stopLoss);
  const invalidation = (entry - stopLoss) / entry;
  const positionSize = (tradingBalance * riskPercent) / 100 / invalidation;

  return (
    <div>
      <Header />
      <form action="" className="calc-container">
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
          <div>
            <label htmlFor="risk-percent">Risk %</label>
            <input
              id="risk-percent"
              placeholder={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <label htmlFor="riskUsdt">Risk USDT</label>
            <input id="riskUsdt" value={riskUSDT} type="number" />
          </div>
        </div>
        <div className="calc-input">
          <div>
            <label htmlFor="entry">E/P</label>
            <input
              id="entry"
              placeholder="14.9"
              onChange={(e) => setEntry(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <label htmlFor="stop-loss">S/L</label>
            <input
              id="stop-loss"
              placeholder="14.5"
              onChange={(e) => setStopLoss(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <label htmlFor="target">T/P</label>
            <input
              id="target"
              placeholder="17.2"
              onChange={(e) => setTarget(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div>
          <button onClick={(e) => e.preventDefault()}>Calculate</button>
        </div>
        <div>
          <div className="calc-res">
            <div>RRR</div>
            <div className="RRR">{rrr}</div>
          </div>
          <div className="calc-res">
            <div>Position Size</div>
            <div className="position-size">{positionSize}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
