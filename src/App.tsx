import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/common/Layout/MainLayout';
import MainPage from './pages/Stock';
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
        <Route index path="/stock" element={<StockPage />} />
        <Route index path="/stock/:id" element={<DetailPage />} />
        <Route index path="/news" element={<NewsBoardPage />} />
        <Route index path="/finngpt" element={<FinnGPTPage />} />
        <Route index path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
