import React, { useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="section-quote">
        <h2>FOLLOW OR BURNT</h2>
        <blockquote>
          <p>Imagine how things look from the future</p>
        </blockquote>
        <blockquote>
          <p>The market doesn't care about your profits</p>
        </blockquote>
        <blockquote>
          <p>Milk it while it's available</p>
        </blockquote>
        <blockquote>
          <p>Never bet without your setup</p>
        </blockquote>
        <blockquote>
          <p>Shit happens</p>
        </blockquote>
      </section>
    </div>
  );
}
