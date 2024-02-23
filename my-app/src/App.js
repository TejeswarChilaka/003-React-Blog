import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1> First React App</h1>
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/About" element={<AboutPage />}></Route>
              <Route path="/Articles" element={<ArticlesListPage />}></Route>
              <Route path="/Articles/:articles" element={<ArticlePage />}></Route>
              <Route path="/*" element={<NotFoundPage />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
