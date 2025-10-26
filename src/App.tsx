import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/common/Layout/MainLayout';
import MainPage from './pages/Main';
import TickerPage from './pages/Ticker';
import DetailPage from './pages/Detail';
import NewsBoardPage from './pages/NewsBoard';
import ArticleDetailPage from './pages/ArticleDetail';
import GlobalStyle from './global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<MainPage />} />
          <Route path="/ticker" element={<TickerPage />} />
          <Route path="/ticker/:id" element={<DetailPage />} />
          <Route path="/news" element={<NewsBoardPage />} />
          <Route path="/news/:id" element={<ArticleDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
