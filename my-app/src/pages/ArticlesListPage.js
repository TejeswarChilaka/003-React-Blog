import ArticlesList from "../components/ArticlesList";
import articles from "./articles-content";




function ArticlesListPage(){
    return(
    <>
    <h1> List of Articles</h1>
   <ArticlesList articles = {articles}></ArticlesList>
    </>     
    );
}

export default ArticlesListPage;