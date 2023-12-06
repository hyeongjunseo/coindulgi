import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Event() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("April 3, 2024 16:38:43Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    // when the Event component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="event-header">
          <h1 className="event-header-title">BTC Halving</h1>
          <div className="event-header-content">
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.days}</div>
              <div>D</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.hours}</div>
              <div>H</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.minutes}</div>
              <div>M</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.seconds}</div>
              <div className="event-countdown-number">S</div>
            </div>
          </div>
        </div>
        <div className="event-content">
          <div className="event-sidebar">
            <ul>
              <li>Jan 2024</li>
              <li>Feb 2024</li>
              <li>Mar 2024</li>
              <li>Apr 2024</li>
            </ul>
          </div>
          <div className="event-list">
            <div className="event-section">
              <div className="event-section-header">
                <h3>Jan 2024</h3>
              </div>
              <div className="event-section-body">
                <h4 className="event-section-title">Spot BTC ETF</h4>
                <p className="event-section-description">
                  Spot BTC ETF approvals ranges between January 5 and 10
                </p>
              </div>
            </div>
            <div className="event-section">
              <div className="event-section-header">
                <h3>Feb 2024</h3>
              </div>
              <div className="event-section-body">
                <h4 className="event-section-title">No events</h4>
                <p className="event-section-dsecription">No events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
