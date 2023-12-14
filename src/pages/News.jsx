import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store";

import Header from "../components/Header/Header";

import { Link } from "react-router-dom";

export default function News() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  console.log(articles);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="width">
        <header className="news-header">
          <h2>News</h2>
        </header>
        <div className="news-list">
          {articles.map((article, i) => (
            <div key={i} className="news-item">
              <div className="article-image">
                <img
                  style={{ width: 100 }}
                  src={article.image}
                  alt={article.title}
                />
              </div>
              <div className="article-content">
                <div className="article-title">{article.title}</div>
                <a href={article.url}>
                  <button>Read More</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
