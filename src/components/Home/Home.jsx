import React, { useEffect } from "react";
import Header from "../Header/Header";

import "../../styles/global.scss";
import "./Home.scss";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <section className="section-quote">
        <h2 className="section-quote-title">FOLLOW OR BURNT</h2>
        <main className="section-quote-quotes">
          <blockquote>
            <p>🐋 Ride or dodge the whale's wave</p>
          </blockquote>
          <blockquote>
            <p>👋 If there's doubt, stay out</p>
          </blockquote>
          <blockquote>
            <p>🤷‍♀️ The market doesn't care about your profits</p>
          </blockquote>
          <blockquote>
            <p>🧘 If you are not patient, trading is not your thing</p>
          </blockquote>
          <blockquote>
            <p>🐄 Milk it while it's available</p>
          </blockquote>
          <blockquote>
            <p>💵 6 + 6 is larger than 10 - 7</p>
          </blockquote>
        </main>
      </section>
    </div>
  );
}
