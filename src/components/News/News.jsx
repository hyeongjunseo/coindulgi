import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

import "../../styles/global.scss";
import "./News.scss";
import PageHead from "../shared/PageHead";

export default function News() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  console.log(articles);
  const [visibleArticles, setVisibleArticles] = useState(5);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="page-container">
      <PageHead title="Latest Cryptocurrency News" />
      <Header />
      <div className="width news-width">
        <header className="news-header">
          <h2>News</h2>
        </header>
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
        {visibleArticles < articles.length && (
          <button
            className="btn-load-more"
            onClick={() => setVisibleArticles(visibleArticles + 5)}
          >
            <p>Load More</p>
          </button>
        )}
      </div>
    </div>
  );
}
