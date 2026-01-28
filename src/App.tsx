import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/common/Layout/MainLayout';
import AuthProvider from './provider/Auth';
import PrivatedRoute from './routes/component/PrivatedRoute';
import AuthPage from './pages/Auth';
import MainPage from './pages/Main';
import TickerPage from './pages/Ticker';
import DetailPage from './pages/Detail';
import NewsBoardPage from './pages/NewsBoard';
import ArticleDetailPage from './pages/ArticleDetail';
import CallbackPage from './pages/Callback';
import JoinPage from './pages/Join';
import GlobalStyle from './global';

/**
 * Root application component that provides authentication context, applies global styles, and declares client-side routes.
 *
 * @returns The root React element containing providers and the app's routing structure.
 */
function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/callback" element={<CallbackPage />} />
        <Route
          path="/auth"
          element={
            <PrivatedRoute>
              <AuthPage />
            </PrivatedRoute>
          }
        />
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<MainPage />} />
          <Route path="/ticker" element={<TickerPage />} />
          <Route path="/ticker/:id" element={<DetailPage />} />
          <Route path="/news" element={<NewsBoardPage />} />
          <Route path="/news/:id" element={<ArticleDetailPage />} />
          <Route
            path="/join"
            element={
              <PrivatedRoute>
                <JoinPage />
              </PrivatedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;