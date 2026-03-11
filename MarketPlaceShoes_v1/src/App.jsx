import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Foot from './components/Foot';
import CartPage from './pages/CartPage';
import Shop from './components/Shop';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Nav />
        </div>
      </header>

      <main className="grow">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shopping-cart" element={<CartPage />} />

          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer className="w-full bg-white border-t border-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <Foot />
        </div>
      </footer>

    </div>
  )
}

export default App;