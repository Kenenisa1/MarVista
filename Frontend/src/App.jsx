import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { routes } from './routeConfig';

// 1. Static Imports (This fixes the 404/MIME errors)
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CreatePage from './pages/CreatePage.jsx';
import UpdateProductPage from './pages/UpdateProductPage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Products from './pages/Products.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// 2. Simple Component Map
const componentMap = {
  HomePage, About, Contact, ProductDetail, CreatePage, 
  UpdateProductPage, SignIn, SignUp, Products, PrivacyPolicy
};

const App = () => {
  const routeElements = useMemo(() => {
    return routes.map((route) => {
      const Component = componentMap[route.element];
      
      let element = <Component />;
      
      if (route.admin) {
        element = <ProtectedRoute><AdminRoute>{element}</AdminRoute></ProtectedRoute>;
      } else if (route.protected) {
        element = <ProtectedRoute>{element}</ProtectedRoute>;
      }
      
      const withLayout = route.layout !== false;
      
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            withLayout ? (
              <>
                <Navbar /><main className="grow">{element}</main><Footer />
              </>
            ) : (
              <div className="min-h-screen">{element}</div>
            )
          }
        />
      );
    });
  }, []);

  return (
    <ErrorBoundary>
      <Toaster position="top-center" />
      <Routes>
        {routeElements}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;