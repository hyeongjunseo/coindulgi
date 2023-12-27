import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import { fetchCoins, searchCoins } from "../../store";

import "../../styles/global.scss";
import "./Trend.scss";
import PageHead from "../shared/PageHead";

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

  // Debounce the setQuery call
  const debouncedSetQuery = debounce((searchQuery) => {
    setQuery(searchQuery);
  }, 500);

  // Trigger search when query changes
  useEffect(() => {
    if (query) {
      dispatch(searchCoins(query));
    }
  }, [query, dispatch]);

  const handleSearchChange = (e) => {
    debouncedSetQuery(e.target.value);
  };

  return (
    <div className="page-container">
      <PageHead title="Top Trending Cryptocurrencies Today" />
      <Header />
      <section className="trend-section">
        <input
          className="trend-search"
          type="text"
          placeholder="Search a coin"
          onChange={handleSearchChange}
        />
        {query.length > 1 ? (
          <h1 className="trend-title">🔎 {query}</h1>
        ) : (
          <h1 className="trend-title">🔥 Trending</h1>
        )}
        <div className="trend-list">
          {query.length > 1
            ? searchedCoins.map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`}>
                  <div className="trend-item">
                    <div className="trend-item-info">
                      <div className="trend-item-img">
                        <img src={coin.image} alt={coin.id} />
                      </div>
                      <div className="trend-item-name">{coin.name}</div>
                    </div>
                  </div>
                </Link>
              ))
            : coins.map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`}>
                  <div className="trend-item">
                    <div className="trend-item-info">
                      <div className="trend-item-img">
                        <img src={coin.image} alt={coin.id} />
                      </div>
                      <div className="trend-item-name">{coin.name}</div>
                    </div>
                    <div className="trend-item-pricing">
                      <div className="trend-item-btc">
                        <img src="/bitcoin.webp" alt="bitcoin" />
                        <span>{coin.price_btc} BTC</span>
                      </div>
                      <div className="trend-item-usd">
                        <span>(${coin.price_usd})</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
