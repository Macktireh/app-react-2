import axios from 'axios';
import React, { useState } from 'react';

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("")

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    return newDate
  };

  const handleEdit = () => {

    const data = {
      content: editContent
    }
    if (editContent === ""){
      setIsEditing(false);
    } else {
      axios.patch("http://localhost:3001/articles/" + article.id, data).then(() => {
        setIsEditing(false);
      })
    }

  }

  return (
    <div
      className="article"
      style={{backgroundColor: isEditing ? "#f3feff" : "white"}}>

      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>

      {isEditing ? (
        <textarea 
          autoFocus
          defaultValue={editContent ? editContent : article.content}
          onChange={e => setEditContent(e.target.value)}></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}

    <div className="btn-container">
      {isEditing ? (
        <button onClick={() => handleEdit()}>Valider</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modifier</button>
      )}
      <button>Supprimer</button>
    </div>
    </div>
  );
};

export default Article;