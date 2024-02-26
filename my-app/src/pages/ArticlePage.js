import articles from "./articles-content";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function ArticlePage() {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);
 
  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph,i) => (
            <p key = {i}>{paragraph}</p>      
        ))}
      </>
    );
  } else {
    return <NotFoundPage></NotFoundPage>;
  }
}

export default ArticlePage;
