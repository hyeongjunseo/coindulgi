import React, { useEffect, useState } from "react";
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

  const { isSearchLoading } = useSelector((state) => {
    return state.searchCoins;
  });

  const { isCoinsLoading } = useSelector((state) => {
    return state.coins;
  });

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

        {isSearchLoading && (
          <svg
            className="search-spinner"
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        )}

        {query.length > 1 ? (
          <h1 className="trend-title">🔎 {query}</h1>
        ) : (
          <h1 className="trend-title">🔥 Trending</h1>
        )}

        {isCoinsLoading ? (
          <svg
            className="coins-spinner"
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            width="50"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        ) : (
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
        )}
      </section>
    </div>
  );
}
