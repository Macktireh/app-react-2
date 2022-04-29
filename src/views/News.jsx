import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "../components/Article";

import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3001/articles")
      .then((res) => setNewsData(res.data));
  };

  return (
    <div className="news-container">
      <Logo />
      <Navigation />
      <h1>News</h1>

      <form>
        <input type="text" placeholder="Nom" />
        <textarea placeholder="Message"></textarea>
        <input type="submit" value="Envoyer" />
      </form>

      <ul>
        {
          newsData
            .sort((a, b) => b.date - a.date)
            .map(article => (
              <Article key={article.id} article={article} />
              ))
        }
      </ul>
    </div>
  );
};

export default News;
