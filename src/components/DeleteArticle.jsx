import axios from 'axios';
import React from 'react';

const DeleteArticle = (props) => {

  const { id, handleDelete } = props;

  return (
    <button type="submit" onClick={() => handleDelete(id)} >Supprimer</button>
  );
};

export default DeleteArticle;