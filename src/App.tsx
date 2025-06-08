import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/common/Layout/MainLayout';
import MainPage from './pages/Main';
import StockPage from './pages/Stock';
import DetailPage from './pages/Detail';
import NewsBoardPage from './pages/NewsBoard';
import FinnGPTPage from './pages/FinnGPT';
import MyPage from './pages/My';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<MainPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/stock/:id" element={<DetailPage />} />
        <Route path="/news" element={<NewsBoardPage />} />
        <Route path="/finngpt" element={<FinnGPTPage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
