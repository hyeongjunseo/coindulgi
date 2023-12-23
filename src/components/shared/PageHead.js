import React from "react";
import { Helmet } from "react-helmet";

export default function PageHead({ title }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} | CoinDulgi</title>
      </Helmet>
    </div>
  );
}
