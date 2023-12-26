import React, { useEffect } from "react";
import Header from "../Header/Header";

import "../../styles/global.scss";
import "./Home.scss";

export default function Home() {
  const quotes = [
    "🐋 Ride or dodge the whale's wave",
    "👋 If there's doubt, stay out",
    "🤷‍♀️ The market doesn't care about your profits",
    "🧘 If you are not patient, trading is not your thing",
    "🐄 Milk it while it's available",
    "💵 6 + 6 is larger than 10 - 7",
  ];

  return (
    <div className="page-container">
      <Header />
      <section className="section-quote">
        <h2 className="section-quote-title">FOLLOW OR BURNT</h2>
        <main className="section-quote-quotes">
          {quotes.map((quote, i) => {
            return (
              <blockquote key={i}>
                <p>{quote}</p>
              </blockquote>
            );
          })}
        </main>
      </section>
    </div>
  );
}
