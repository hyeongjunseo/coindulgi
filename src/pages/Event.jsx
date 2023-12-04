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
              <div className="event-countdown-label">D</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.hours}</div>
              <div className="event-countdown-label">H</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.minutes}</div>
              <div className="event-countdown-label">M</div>
            </div>
            <div className="event-countdown">
              <div className="event-countdown-number">{countdown.seconds}</div>
              <div className="event-countdown-label">S</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
