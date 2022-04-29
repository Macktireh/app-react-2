import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "../components/Article";

import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3001/articles")
      .then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (author === "") {
      setAuthorError(true);
    } else if (content.length < 140){
      setContentError(true);
    } else{
      axios.post("http://localhost:3001/articles", {
        author,
        content,
        date: Date.now(),
      }).then(() => {
        setAuthor("");
        setContent("");
        setAuthorError(false);
        setContentError(false);
        getData();
      })
    }
  }

  return (
    <div className="news-container">
      <Logo />
      <Navigation />
      <h1>News</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <input
          className={authorError ? "error" : ""}
          type="text"
          placeholder="Nom"
          value={author}
          onChange={e => setAuthor(e.target.value)}/>
          {authorError && <p>Le nom de l'auteur est obligatoire</p>}
        <textarea
          className={contentError ? "error" : ""}
          // style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          value={content}
          onChange={e => setContent(e.target.value)}></textarea>
          {contentError && <p>Veuillez écrire un minimum de 140 caractères.</p>}
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
