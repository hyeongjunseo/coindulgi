import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

import "../../styles/global.scss";
import "./News.scss";

export default function News() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  console.log(articles);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="page-container">
      <Header />
      <div className="width news-width">
        <header className="news-header">
          <h2>News</h2>
        </header>
        <div className="news-list">
          {articles.map((article, i) => (
            <Link to={article.url} key={i} className="news-item">
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-content">
                <div className="article-title">{article.title}</div>
                <div className="article-description">{article.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
