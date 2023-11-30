import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../store";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Trend() {
  const dispatch = useDispatch();
  const coins = useSelector((state) => {
    return state.coins.data;
  });
  console.log(coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section className="section-trend">
        <h1 className="section-trend-title">TOP-7</h1>
        <div className="section-trend-list">
          {coins.map((coin) => (
            <Link key={coin.id} to={`/coins/${coin.id}`}>
              <div className="section-trend-coin">{coin.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
