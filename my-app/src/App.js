
import './App.css';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
    Hello React
    <AboutPage></AboutPage>
    <ArticlePage></ArticlePage>
    <ArticlesPage></ArticlesPage>
    <HomePage></HomePage>
    <NotFoundPage></NotFoundPage>
    </>
  );
}

export default App;
