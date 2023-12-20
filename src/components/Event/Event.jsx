import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

import "../../styles/global.scss";
import "./Event.scss";

export default function Event() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ];

  const events = [
    {
      month: "Jan 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Feb 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Mar 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Apr 2024",
      events: [
        {
          title: "Bitcoin halving",
          description: "The next BTC halving is likely to occur",
        },
      ],
    },
    {
      month: "May 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Jun 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
  ];

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
    <div className="page-container">
      <Header />
      <div className="event-header">
        <h1 className="event-header-title">BTC Halving</h1>
        <div className="event-header-content">
          <div className="event-countdown">
            <span className="event-countdown-number">{countdown.days}</span>
            <span>D</span>
          </div>
          <div className="event-countdown">
            <span className="event-countdown-number">{countdown.hours}</span>
            <span>H</span>
          </div>
          <div className="event-countdown">
            <span className="event-countdown-number">{countdown.minutes}</span>
            <span>M</span>
          </div>
          <div className="event-countdown">
            <span className="event-countdown-number">{countdown.seconds}</span>
            <span>S</span>
          </div>
        </div>
      </div>
      <div className="event-content">
        <div className="event-sidebar">
          <ul>
            {months.map((month, i) => (
              <li key={i}>{month}</li>
            ))}
          </ul>
        </div>
        <div className="event-list">
          {events.map((eventMonth) => (
            <div key={eventMonth.month} className="event-section">
              <div className="event-section-header">
                <h3>{eventMonth.month}</h3>
              </div>
              {eventMonth.events.map((event, i) => (
                <div className="event-section-body">
                  <h4 className="event-section-title">{event.title}</h4>
                  <p className="event-section-description">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
