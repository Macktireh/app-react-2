import axios from 'axios';
import React, { useState } from 'react';
import DeleteArticle from './DeleteArticle';

const Article = (props) => {
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
      axios.patch("http://localhost:3001/articles/" + props.article.id, data).then(() => {
        setIsEditing(false);
      })
    }

  }

  return (
    <div
      className="article"
      style={{backgroundColor: isEditing ? "#f3feff" : "white"}}>

      <div className="card-header">
        <h3>{props.article.author}</h3>
        <em>Posté le {dateParser(props.article.date)}</em>
      </div>

      {isEditing ? (
        <textarea 
          autoFocus
          defaultValue={editContent ? editContent : props.article.content}
          onChange={e => setEditContent(e.target.value)}></textarea>
      ) : (
        <p>{editContent ? editContent : props.article.content}</p>
      )}

    <div className="btn-container">
      {isEditing ? (
        <button onClick={() => handleEdit()}>Valider</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modifier</button>
      )}
      <DeleteArticle id={props.article.id} handleDelete={props.handleDelete} />
    </div>
    </div>
  );
};

export default Article;