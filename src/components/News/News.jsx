import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

import "../../styles/global.scss";
import "./News.scss";
import PageHead from "../shared/PageHead";

export default function News() {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const articles = useSelector((state) => state.news.articles);
  console.log(articles);
  const [visibleArticles, setVisibleArticles] = useState(5);
  const { isLoading } = useSelector((state) => state.news);
  const [showUpButton, setShowUpButton] = useState(false);

  // Add a state to manage the visibility of the options list
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // Function to toggle the visibility of the options list
  const toggleOptionsList = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  //initial dispatch
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  //when 'selectedCoin' state changes
  useEffect(() => {
    dispatch(fetchNews(selectedCoin));
  }, [dispatch, selectedCoin]);

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
      <PageHead title="Latest Cryptocurrency News" />
      <Header />
      <div className="width news-width">
        <header className="news-header">
          <h2>News</h2>
          <div className="news-search">
            <div className="select-wrapper">
              <div className="news-select" onClick={toggleOptionsList}>
                <span>{selectedCoin}</span>
                <div
                  className={`news-option-list ${
                    isOptionsVisible ? "show" : ""
                  }`}
                >
                  <div
                    onClick={() => {
                      setSelectedCoin("All Coins");
                      setVisibleArticles(5);
                    }}
                  >
                    All Coins
                  </div>
                  <div
                    onClick={() => {
                      setSelectedCoin("Ethereum");
                      setVisibleArticles(5);
                    }}
                  >
                    Ethereum
                  </div>
                  <div
                    onClick={() => {
                      setSelectedCoin("Bitcoin");
                      setVisibleArticles(5);
                    }}
                  >
                    Bitcoin
                  </div>
                  <div
                    onClick={() => {
                      setSelectedCoin("Solana");
                      setVisibleArticles(5);
                    }}
                  >
                    Solana
                  </div>
                  <div
                    onClick={() => {
                      setSelectedCoin("Chainlink");
                      setVisibleArticles(5);
                    }}
                  >
                    Chainlink
                  </div>
                </div>
              </div>
              <svg
                id="select-arrow"
                className="select-arrow"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
                fill="#555e68"
              >
                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </div>
          </div>
        </header>
        {isLoading ? (
          <svg
            className="news-spinner"
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            width="50"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        ) : (
          <div className="news-list">
            {articles.slice(0, visibleArticles).map((article, i) => (
              <Link to={article.url} key={i} className="news-item">
                <div className="article-image">
                  <img loading="lazy" src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <div className="article-title">{article.title}</div>
                  <div className="article-description">
                    {article.description.length > 130
                      ? `${article.description.substring(0, 120)}...`
                      : article.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && visibleArticles < articles.length && (
          <button
            className="btn-load-more"
            onClick={() => setVisibleArticles(visibleArticles + 5)}
          >
            <p>Load More</p>
          </button>
        )}
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
