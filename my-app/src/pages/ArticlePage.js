import articles from "./articles-content";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AddCommentForm from "../components/AddCommentForm";
import CommentList from "../components/CommentList";

function ArticlePage() {
  const [articleInfo, setArticleInfo] = useState({ likes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo();
  }, []);

  const article = articles.find(article => article.name === articleId);

  const addLikes = async () => {
    const response = await axios.put(`/api/articles/${articleId}/likes`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };
  
  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        <div className="upvote-section">
          <button onClick={addLikes}>Like</button>
        </div>
        <p>
          {article.title} has {articleInfo.likes} likes!...
        </p>
        {article.content.map((paragraph, i) => (
          <div key={i}>{paragraph}</div>
        ))}
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        ></AddCommentForm>

        <CommentList comments={articleInfo.comments}></CommentList>
      </>
    );
  } else {
    return <NotFoundPage></NotFoundPage>;
  }
}
export default ArticlePage;
