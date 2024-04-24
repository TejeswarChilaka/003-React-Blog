import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const user = useUser();

  const addComment = async () => {
    const token = user && (await user.user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        by: name,
        comment: commentText,
      },
      { headers }
    );

    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add Comments</h3>
      {user && <p>Posting as {user.email}</p>}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="10"
        cols="30"
      ></textarea>
      <button onClick={addComment}> Send Comment</button>
    </div>
  );
};

export default AddCommentForm;
