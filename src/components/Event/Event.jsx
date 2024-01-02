import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

import "../../styles/global.scss";
import "./Event.scss";
import PageHead from "../shared/PageHead";

export default function Event() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showUpButton, setShowUpButton] = useState(false);

  const events = [
    {
      month: "Jan 2024",
      events: [
        {
          title: "Spot BTC ETF",
          description: "Spot BTC ETF approvals ranges between January 5 and 10",
        },
        {
          title: "Manta Pacific Mainnet",
          description: "Deposit tokens and earn Manta token rewards",
        },
      ],
    },
    {
      month: "Feb 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
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
          title: "Another Event",
          description: "Description of another event",
        },
        ,
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
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "May 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
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
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Jul 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Aug 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Sep 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Oct 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Nov 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
        },
        {
          title: "Another Event",
          description: "Description of another event",
        },
      ],
    },
    {
      month: "Dec 2024",
      events: [
        {
          title: "Another Event",
          description: "Description of another event",
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

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setShowUpButton(true);
        const upButton = document.querySelector(".up-btn");
        if (upButton) {
          upButton.classList.add("show");
        }
      } else {
        setShowUpButton(false);
      }
    });
  }, []);

  return (
    <div className="page-container">
      <PageHead title="Cryptocurrency Events Calendar - Stay Informed About Crypto" />
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
            {events.map((eventMonth) => (
              <li key={eventMonth.month}>
                <a href={`#${eventMonth.month}`}>{eventMonth.month}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="event-list">
          {events.map((eventMonth) => (
            <div
              key={eventMonth.month}
              id={eventMonth.month}
              className="event-section"
            >
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
      {showUpButton && (
        <div
          className="up-btn"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4l107.1-99.9c3.8-3.5 8.7-5.5 13.8-5.5s10.1 2 13.8 5.5l107.1 99.9c4.5 4.2 7.1 10.1 7.1 16.3c0 12.3-10 22.3-22.3 22.3H304v96c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V256H150.3C138 256 128 246 128 233.7c0-6.2 2.6-12.1 7.1-16.3z" />
          </svg>
        </div>
      )}
    </div>
  );
}
