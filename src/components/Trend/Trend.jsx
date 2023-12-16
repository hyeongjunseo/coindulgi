import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

import { fetchCoins, searchCoins } from "../../store";

import "../../styles/global.scss";
import "./Trend.scss";

export default function Trend() {
  const dispatch = useDispatch();
  const coins = useSelector((state) => {
    return state.coins.data;
  });
  const searchedCoins = useSelector((state) => {
    return state.searchCoins.data;
  });
  console.log(coins);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <div className="page-container">
      <Header />
      <section className="section-trend">
        <h1 className="section-trend-title">TOP-15</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            const currentQuery = e.target.value;
            setQuery(currentQuery);
            dispatch(searchCoins(currentQuery));
          }}
        />
        <div className="section-trend-list">
          {query.length > 1
            ? searchedCoins.map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`}>
                  <div className="section-trend-searchedCoin">{coin.name}</div>
                </Link>
              ))
            : coins.map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`}>
                  <div className="section-trend-coin">{coin.name}</div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
